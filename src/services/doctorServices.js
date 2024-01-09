import db from "../models";
import { differenceWith, intersectionWith } from "lodash";
require("dotenv").config();
const { Sequelize } = require("sequelize");

let maxNumberSchedule = process.env.MAX_NUMBER_SCHEDULE || 10;

const getDataDoctors = (limitCount) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findAll({
        limit: limitCount,
        where: {
          firstName: {
            [Sequelize.Op.ne]: null,
          },
          roleId: "R2",
        },
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["password"] },
        include: [
          {
            model: db.Regulation,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Regulation,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findAll({
        where: {
          firstName: {
            [Sequelize.Op.ne]: null,
          },
          roleId: "R2",
        },
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["password", "image"] },
        raw: true,
        nest: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const createInforDoctor = (dataInforDoctor) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Markdown.create({
        contentHTML: dataInforDoctor.contentHTML,
        contentMarkdown: dataInforDoctor.contentMarkDown,
        description: dataInforDoctor.descriptionDoctor,
        priceType: dataInforDoctor.priceSelect,
        noteText: dataInforDoctor.noteText,
        doctorId: dataInforDoctor.selectDoctor,
      });
      resolve({
        errCode: 0,
        errMessage: "Created new user success !",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getInforDoctor = (idDoctor) => {
  return new Promise(async (resolve, reject) => {
    try {
      const inforDoctor = await db.Markdown.findOne({
        where: { doctorId: idDoctor },
        raw: true,
      });
      if (inforDoctor) {
        resolve(inforDoctor);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateInforDoctor = (inforDoctor) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataDoctorUpdate = await db.Markdown.findOne({
        where: { doctorId: inforDoctor.selectDoctor },
        raw: false,
      });

      (dataDoctorUpdate.contentHTML = inforDoctor.contentHTML),
        (dataDoctorUpdate.contentMarkdown = inforDoctor.contentMarkDown),
        (dataDoctorUpdate.description = inforDoctor.descriptionDoctor),
        (dataDoctorUpdate.priceType = inforDoctor.priceSelect),
        (dataDoctorUpdate.noteText = inforDoctor.noteText),
        (dataDoctorUpdate.doctorId = inforDoctor.selectDoctor),
        await dataDoctorUpdate.save();
      resolve({
        errCode: 0,
        errMessage: "Update information user success !",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const GetDataDoctorByID = (idDoctor) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataDoctor = await db.User.findOne({
        where: { id: idDoctor },
        attributes: { exclude: ["password"] },
        include: [
          {
            model: db.Markdown,
            attributes: [
              "contentHTML",
              "contentMarkdown",
              "description",
              "priceType",
              "noteText",
            ],
          },
          {
            model: db.Regulation,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: false,
        nest: true,
      });
      if (dataDoctor && dataDoctor.image) {
        dataDoctor.image = new Buffer(dataDoctor.image, "base64").toString(
          "binary"
        );
      }
      if (dataDoctor) {
        resolve(dataDoctor);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const bulkCreateSchedule = (dataListSchedule) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataDBSchedule = await db.Schedule.findAll({
        where: {
          doctorId: dataListSchedule[0].doctorId,
          date: {
            [Sequelize.Op.between]: [
              new Date(dataListSchedule[0].date).setHours(0, 0, 0, 0),
              new Date(dataListSchedule[0].date).setHours(23, 59, 59, 999),
            ],
          },
        },
        attributes: ["doctorId", "date", "timeType"],
        raw: true,
      });

      // Kiểm tra trùng lặp time vs ngày và có quá số lượng bệnh nhân trong 1 khoảng time của bác sĩ hay không
      if (dataDBSchedule && dataDBSchedule.length > 0) {
        // list timeType được thêm
        const listCreateSchedule = differenceWith(
          dataListSchedule,
          dataDBSchedule,
          (a, b) => a.timeType === b.timeType
        );

        // list timeType bị xóa
        const listDeleteSchedule = differenceWith(
          dataDBSchedule,
          dataListSchedule,
          (a, b) => a.timeType === b.timeType
        );
        if (listCreateSchedule && listCreateSchedule.length > 0) {
          const dataCreateSchedule = listCreateSchedule.map((item) => {
            return {
              date: item.date,
              timeType: item.timeType,
              doctorId: item.doctorId,
              maxNumber: maxNumberSchedule,
            };
          });
          await db.Schedule.bulkCreate(dataCreateSchedule);
        }
        if (listDeleteSchedule && listDeleteSchedule.length > 0) {
          const dataDeleteSchedule = listDeleteSchedule.map((item) => {
            return item.timeType;
          });
          await db.Schedule.destroy({
            where: {
              timeType: { [Sequelize.Op.in]: dataDeleteSchedule },
            },
          });
        }
      } else {
        const dataCreateSchedule = dataListSchedule.map((item) => {
          return {
            date: item.date,
            timeType: item.timeType,
            doctorId: item.doctorId,
            maxNumber: maxNumberSchedule,
          };
        });
        await db.Schedule.bulkCreate(dataCreateSchedule);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getDataDoctorSchedule = (listParams) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataDBSchedule = await db.Schedule.findAll({
        where: {
          doctorId: listParams.idDoctor,
          date: {
            [Sequelize.Op.between]: [
              new Date(Number(listParams.dateSelect)).setHours(0, 0, 0, 0),
              new Date(Number(listParams.dateSelect)).setHours(23, 59, 59, 999),
            ],
          },
        },
        raw: true,
      });
      // Kiểm tra trùng lặp time vs ngày và có quá số lượng bệnh nhân trong 1 khoảng time của bác sĩ hay không
      if (dataDBSchedule && dataDBSchedule.length > 0) {
        resolve(dataDBSchedule);
      } else {
        resolve({
          errCode: 2,
          errMessage: "Schedule data has not been set up yet !",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getDataDoctors,
  getAllDoctors,
  createInforDoctor,
  getInforDoctor,
  updateInforDoctor,
  GetDataDoctorByID,
  bulkCreateSchedule,
  getDataDoctorSchedule,
};
