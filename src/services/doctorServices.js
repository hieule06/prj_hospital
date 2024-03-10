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
      await db.Infor_Doctor.create({
        contentHTML: dataInforDoctor.contentHTML,
        contentMarkdown: dataInforDoctor.contentMarkDown,
        description: dataInforDoctor.descriptionDoctor,
        priceType: dataInforDoctor.priceSelect,
        specialtyId: dataInforDoctor.specialtySelect,
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
      const inforDoctor = await db.Infor_Doctor.findOne({
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
      let dataDoctorUpdate = await db.Infor_Doctor.findOne({
        where: { doctorId: inforDoctor.selectDoctor },
        raw: false,
      });

      (dataDoctorUpdate.contentHTML = inforDoctor.contentHTML),
        (dataDoctorUpdate.contentMarkdown = inforDoctor.contentMarkDown),
        (dataDoctorUpdate.description = inforDoctor.descriptionDoctor),
        (dataDoctorUpdate.priceType = inforDoctor.priceSelect),
        (dataDoctorUpdate.specialtyId = inforDoctor.specialtySelect),
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
            model: db.Infor_Doctor,
            attributes: [
              "contentHTML",
              "contentMarkdown",
              "description",
              "priceType",
              "specialtyId",
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

const GetDataDoctorByIDSpecialty = (idSpecialty) => {
  return new Promise(async (resolve, reject) => {
    try {
      const listDataDoctors =
        idSpecialty === "All"
          ? await db.Infor_Doctor.findAll({
              include: [
                {
                  model: db.User,
                  attributes: [
                    "firstName",
                    "lastName",
                    "address",
                    "email",
                    "password",
                    "gender",
                    "phoneNumber",
                    "positionId",
                    "image",
                    "roleId",
                  ],
                  include: [
                    {
                      model: db.Infor_Doctor,
                      attributes: [
                        "contentHTML",
                        "contentMarkdown",
                        "description",
                        "priceType",
                        "specialtyId",
                        "noteText",
                      ],
                    },
                    {
                      model: db.Regulation,
                      as: "positionData",
                      attributes: ["valueEn", "valueVi"],
                    },
                  ],
                },
              ],
              raw: false,
              nest: true,
            })
          : await db.Infor_Doctor.findAll({
              where: { specialtyId: idSpecialty },
              include: [
                {
                  model: db.User,
                  attributes: [
                    "firstName",
                    "lastName",
                    "address",
                    "email",
                    "gender",
                    "phoneNumber",
                    "positionId",
                    "image",
                    "roleId",
                  ],
                  include: [
                    {
                      model: db.Infor_Doctor,
                      attributes: [
                        "contentHTML",
                        "contentMarkdown",
                        "description",
                        "priceType",
                        "specialtyId",
                        "noteText",
                      ],
                    },
                    {
                      model: db.Regulation,
                      as: "positionData",
                      attributes: ["valueEn", "valueVi"],
                    },
                  ],
                },
              ],
              raw: false,
              nest: true,
            });
      if (listDataDoctors) {
        resolve(listDataDoctors);
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

// Specialty page

const createNewSpecialty = (dataSpecialty) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Specialty.create({
        name: dataSpecialty.nameSpecialty,
        descriptionHTML: dataSpecialty.descriptionHTML,
        descriptionMarkdown: dataSpecialty.descriptionMarkdown,
        image: dataSpecialty.imgSpecialty,
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

const updateDataSpecialty = (dataSpecialty) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataSpecialtyUpdate = await db.Specialty.findOne({
        where: { name: dataSpecialty.nameSpecialty },
        raw: false,
      });

      (dataSpecialtyUpdate.descriptionHTML = dataSpecialty.descriptionHTML),
        (dataSpecialtyUpdate.descriptionMarkdown =
          dataSpecialty.descriptionMarkdown),
        (dataSpecialtyUpdate.image = dataSpecialty.imgSpecialty),
        await dataSpecialtyUpdate.save();
      resolve({
        errCode: 0,
        errMessage: "Update information user success !",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteDataSpecialty = (idSpecialty) => {
  return new Promise(async (resolve, reject) => {
    try {
      let specialtyDelete = await db.Specialty.findOne({
        where: { id: idSpecialty },
      });
      if (specialtyDelete) {
        await db.Specialty.destroy({ where: { id: idSpecialty } });
        resolve({
          errCode: 0,
          errMessage: "Delete specialty success!",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "The specialty isn't exist",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getDataSpecialties = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataSpecialty = await db.Specialty.findAll();
      if (dataSpecialty) {
        resolve(dataSpecialty);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const GetDataSpecialtyByID = (idSpecialty) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataSpecialty = await db.Specialty.findOne({
        where: { id: idSpecialty },
      });
      if (dataSpecialty) {
        resolve(dataSpecialty);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Handbook page

const createNewHandbook = (dataHandbook) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Handbook.create({
        nameHandbook: dataHandbook.nameHandbook,
        descriptionHTML: dataHandbook.descriptionHTML,
        descriptionMarkdown: dataHandbook.descriptionMarkdown,
        imageHandbook: dataHandbook.imgHandbook,
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

const updateDataHandbook = (dataHandbook) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataHandbookUpdate = await db.Handbook.findOne({
        where: { nameHandbook: dataHandbook.nameHandbook },
        raw: false,
      });

      (dataHandbookUpdate.descriptionHTML = dataHandbook.descriptionHTML),
        (dataHandbookUpdate.descriptionMarkdown =
          dataHandbook.descriptionMarkdown),
        (dataHandbookUpdate.imageHandbook = dataHandbook.imgHandbook),
        await dataHandbookUpdate.save();
      resolve({
        errCode: 0,
        errMessage: "Update information user success !",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteDataHandbook = (idHandbook) => {
  return new Promise(async (resolve, reject) => {
    try {
      let handbookDelete = await db.Handbook.findOne({
        where: { id: idHandbook },
      });
      if (handbookDelete) {
        await db.Handbook.destroy({ where: { id: idHandbook } });
        resolve({
          errCode: 0,
          errMessage: "Delete handbook success!",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "The handbook isn't exist",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getDataHandbook = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataHandbook = await db.Handbook.findAll();
      if (dataHandbook) {
        resolve(dataHandbook);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const GetDataHandbookByID = (idHandbook) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataHandbook = await db.Handbook.findOne({
        where: { id: idHandbook },
      });
      if (dataHandbook) {
        resolve(dataHandbook);
      } else {
        resolve(false);
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
  GetDataDoctorByIDSpecialty,
  bulkCreateSchedule,
  getDataDoctorSchedule,
  createNewSpecialty,
  updateDataSpecialty,
  deleteDataSpecialty,
  getDataSpecialties,
  GetDataSpecialtyByID,
  createNewHandbook,
  updateDataHandbook,
  deleteDataHandbook,
  getDataHandbook,
  GetDataHandbookByID,
};
