// import { Promise } from "sequelize";
import dayjs from "dayjs";
import db from "../models";
import emailService from "../services/emailService";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();
const { Sequelize } = require("sequelize");

let buidUrlEmail = (doctorId, token) => {
  {
    let result = `${process.env.URL_LOCALHOST}verify-booking?token=${token}&doctorId=${doctorId}`;

    return result;
  }
};

const patientAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let token = uuidv4();

      const user = await db.User.findOne({
        where: { email: data.email },
        raw: false,
      });
      if (user) {
        (user.lastName = user.lastName ? user.lastName : data.patientName),
          (user.email = user.email ? user.email : data.email),
          (user.address = user.address ? user.address : data.address),
          (user.phoneNumber = user.phoneNumber
            ? user.phoneNumber
            : data.phoneNumber),
          (user.gender = user.gender ? user.gender : data.gender),
          (user.roleId = "R3");

        await user.save();
      }

      let booking;
      if (user) {
        booking = await db.Booking.findOrCreate({
          where: {
            patientsId: user.id,
            date: {
              [Sequelize.Op.between]: [
                new Date(data.date).setHours(0, 0, 0, 0),
                new Date(data.date).setHours(23, 59, 59, 999),
              ],
            },
          },
          defaults: {
            statusId: "S1",
            doctorId: data.doctorId,
            date: data.date,
            timeType: data.timeType,
            token: token,
          },
        });
      }

      if (booking && booking[1]) {
        const resultSendEmail = await emailService.sendEmailConfirm({
          receiverEmail: data.email,
          scheduleTimeFrame: data.scheduleTimeFrame,
          doctorName: data.doctorName,
          patientName: data.patientName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          reason: data.reason,
          redireactLink: buidUrlEmail(data.doctorId, token),
          language: data.language,
        });
      }
      resolve(booking);
    } catch (error) {
      reject(error);
    }
  });
};

let postVerifyBookAppoinment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let appoinment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appoinment) {
          const checkNumberBooking = await db.Booking.findAll({
            where: {
              doctorId: appoinment.doctorId,
              date: {
                [Sequelize.Op.between]: [
                  new Date(Number(appoinment.date)).setHours(0, 0, 0, 0),
                  new Date(Number(appoinment.date)).setHours(23, 59, 59, 999),
                ],
              },
              timeType: appoinment.timeType,
            },
            raw: false,
          });
          if (checkNumberBooking.length <= 10) {
            appoinment.statusId = "S2";
            await appoinment.save();
            resolve({
              errCode: 0,
              errMessage: "Update the appoinment success!",
            });
          } else {
            resolve({
              errCode: 3,
              errMessage:
                "Examination schedule is full, please allow another time!",
            });
          }
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been activated or does not exist!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Patient manage

const getDataBookingByDate = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataBooking;
      if (data.idDoctor === "all") {
        dataBooking = await db.Booking.findAll({
          where: {
            date: {
              [Sequelize.Op.between]: [
                new Date(Number(data.date)).setHours(0, 0, 0, 0),
                new Date(Number(data.date)).setHours(23, 59, 59, 999),
              ],
            },
            statusId: {
              [Sequelize.Op.or]: ["S2", "S3"],
            },
          },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: [
                "lastName",
                "address",
                "email",
                "gender",
                "phoneNumber",
                "roleId",
              ],
            },
          ],
          raw: false,
          nest: true,
        });
      } else {
        dataBooking = await db.Booking.findAll({
          where: {
            date: {
              [Sequelize.Op.between]: [
                new Date(Number(data.date)).setHours(0, 0, 0, 0),
                new Date(Number(data.date)).setHours(23, 59, 59, 999),
              ],
            },
            statusId: {
              [Sequelize.Op.or]: ["S2", "S3"],
            },
            doctorId: data.idDoctor,
          },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: [
                "lastName",
                "address",
                "email",
                "gender",
                "phoneNumber",
                "roleId",
              ],
            },
          ],
          raw: false,
          nest: true,
        });
      }

      if (dataBooking) {
        resolve(dataBooking);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateStatusBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let appoinment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: data.statusBefore,
          },
          raw: false,
        });
        if (appoinment) {
          appoinment.statusId = data.statusAfter;
          await appoinment.save();
          resolve({
            errCode: 0,
            errMessage: "Update the status-booking is success!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "update error !",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteBookings = (arrId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!arrId || arrId.length <= 0) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let result = await db.Booking.destroy({
          where: {
            id: { [Sequelize.Op.in]: arrId },
          },
          raw: false,
        });
        resolve({
          errCode: 0,
          errMessage: "Delete success !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getDataBookingHadPatients = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataPatients;
      let queryOptions = {
        statusId: "S4",
      };
      if (data.idPatient !== "all") {
        queryOptions.patientsId = data.idPatient;
      }
      if (data.idDoctor === "all") {
        dataPatients = await db.Booking.findAll({
          where: {
            date: {
              [Sequelize.Op.between]: [
                new Date(
                  new Date(Number(data.currentDate)).getFullYear(),
                  new Date(Number(data.currentDate)).getMonth(),
                  1
                ).setHours(0, 0, 0, 0),
                new Date(
                  new Date(Number(data.currentDate)).getFullYear(),
                  new Date(Number(data.currentDate)).getMonth() + 1,
                  0
                ).setHours(23, 59, 59, 999),
              ],
            },
            ...queryOptions,
          },
          order: [["updatedAt", "DESC"]],
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: [
                "lastName",
                "address",
                "email",
                "gender",
                "phoneNumber",
                "roleId",
              ],
            },
          ],
          raw: false,
          nest: true,
        });
      } else {
        dataPatients = await db.Booking.findAll({
          where: {
            date: {
              [Sequelize.Op.between]: [
                new Date(
                  new Date(Number(data.currentDate)).getFullYear(),
                  new Date(Number(data.currentDate)).getMonth(),
                  1
                ).setHours(0, 0, 0, 0),
                new Date(
                  new Date(Number(data.currentDate)).getFullYear(),
                  new Date(Number(data.currentDate)).getMonth() + 1,
                  0
                ).setHours(23, 59, 59, 999),
              ],
            },
            doctorId: data.idDoctor,
            ...queryOptions,
          },
          order: [["updatedAt", "DESC"]],
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: [
                "lastName",
                "address",
                "email",
                "gender",
                "phoneNumber",
                "roleId",
              ],
            },
          ],
          raw: false,
          nest: true,
        });
      }

      if (dataPatients) {
        resolve(dataPatients);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let createHistoryPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.History.create({
        patientsId: data.patientsId,
        doctorId: data.doctorId,
        description: data.description,
      });
      resolve({
        errCode: 0,
        errMessage: "Created history success !",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getHistoryPatientByIdPatient = (idPatient) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataHistoryPatient = await db.History.findAll({
        where: { patientsId: idPatient },
      });
      if (dataHistoryPatient) {
        resolve(dataHistoryPatient);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllPatients = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const listPatients = await db.User.findAll({
        where: { roleId: "R3" },
      });
      if (listPatients) {
        resolve(listPatients);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let createBookingReExamination = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const reExamination = await db.Re_Examination.findOrCreate({
        where: {
          patientsId: data.patientsId,
          date: {
            [Sequelize.Op.between]: [
              new Date(data.currentDate).setHours(0, 0, 0, 0),
              new Date(data.currentDate).setHours(23, 59, 59, 999),
            ],
          },
        },
        defaults: {
          patientsId: data.patientsId,
          date: data.currentDate,
        },
      });
      if (reExamination && reExamination[1]) {
        resolve({ errCode: 0, errMessage: "Create Re-examination success !" });
      } else {
        resolve({ errCode: 2, errMessage: "Re-examination already exists !" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getBookingReExamination = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let listReExamination;
      const queryOptions = {};
      if (data.patientsId && data.patientsId !== "all") {
        queryOptions.patientsId = data.patientsId;
      }
      if (
        data.currentDate &&
        data.currentDate !== "-1" &&
        data.currentDate !== "0"
      ) {
        listReExamination = await db.Re_Examination.findAll({
          where: {
            ...queryOptions,
            date: {
              [Sequelize.Op.between]: [
                new Date(Number(data.currentDate)).setHours(0, 0, 0, 0),
                new Date(Number(data.currentDate)).setHours(23, 59, 59, 999),
              ],
            },
          },
          order: [["date", "ASC"]],
          include: [
            {
              model: db.User,
              as: "patientReExamination",
              attributes: [
                "lastName",
                "address",
                "email",
                "gender",
                "phoneNumber",
                "roleId",
              ],
            },
          ],
          raw: false,
          nest: true,
        });
      } else {
        listReExamination = await db.Re_Examination.findAll({
          where: {
            ...queryOptions,
          },
          order: [["date", "ASC"]],
          include: [
            {
              model: db.User,
              as: "patientReExamination",
              attributes: [
                "lastName",
                "address",
                "email",
                "gender",
                "phoneNumber",
                "roleId",
              ],
            },
          ],
          raw: false,
          nest: true,
        });
      }
      if (listReExamination && listReExamination.length > 0) {
        resolve({
          errCode: 0,
          errMessage: "Get Re-examination success !",
          listReExamination,
        });
      } else {
        resolve({ errCode: 1, errMessage: "Get Re-examination fail !" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let sendEmailReExamination = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.Re_Examination.destroy({
        where: {
          id: { [Sequelize.Op.in]: data.arrIdReExamination },
        },
        raw: false,
      });
      await Promise.all(
        data.listReExamination.length > 0 &&
          data.listReExamination.map(async (item) => {
            const resultSendEmail = await emailService.sendEmailReExamination({
              receiverEmail: item.patientReExamination.email,
              currentDate: dayjs(item.date).format("DD-MM-YYYY"),
              patientName: item.patientReExamination.lastName,
              language: data.language,
            });
          })
      );
      resolve({
        errCode: 0,
        errMessage: "Re-examination success !",
      });
    } catch (e) {
      console.log(e);
      reject(false);
    }
  });
};

module.exports = {
  patientAppointment,
  postVerifyBookAppoinment,
  getDataBookingByDate,
  updateStatusBooking,
  deleteBookings,
  getDataBookingHadPatients,
  createHistoryPatient,
  getHistoryPatientByIdPatient,
  getAllPatients,
  createBookingReExamination,
  getBookingReExamination,
  sendEmailReExamination,
};
