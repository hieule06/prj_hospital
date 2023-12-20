import bcrypt from "bcryptjs";
import db from "../models";

const getDataDoctors = (limitCount) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findAll({
        limit: limitCount,
        where: { roleId: "R2" },
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
        where: { roleId: "R2" },
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
            attributes: ["contentHTML", "contentMarkdown", "description"],
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

module.exports = {
  getDataDoctors,
  getAllDoctors,
  createInforDoctor,
  getInforDoctor,
  updateInforDoctor,
  GetDataDoctorByID,
};
