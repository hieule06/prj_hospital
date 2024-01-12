import db from "../models";
import emailService from "../services/emailService";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();
const { Sequelize } = require("sequelize");

let buidUrlEmail = (doctorId, token) => {
  {
    let result = `${process.env.URL_LOCALHOST}/verify-booking?token=${token}&doctorId=${doctorId}`;

    return result;
  }
};

const patientAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let token = uuidv4();

      const user = await db.User.findOrCreate({
        where: { email: data.email },
        defaults: {
          lastName: data.patientName,
          email: data.email,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: "R3",
        },
      });

      let booking;
      if (user && user[0]) {
        booking = await db.Booking.findOrCreate({
          where: {
            patientsId: user[0].id,
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
        /* const resultSendEmail = await emailService.sendEmailConfirm({
          receiverEmail: data.email,
          scheduleTimeFrame: data.scheduleTimeFrame,
          doctorName: data.doctorName,
          patientName: data.patientName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          reason: data.reason,
          redireactLink: buidUrlEmail(data.doctorId, token),
          language: data.language,
        }); */
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

module.exports = {
  patientAppointment,
  postVerifyBookAppoinment,
  getDataBookingByDate,
  updateStatusBooking,
};
