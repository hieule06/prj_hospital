import bcrypt from "bcryptjs";
import db from "../models";
const { Sequelize } = require("sequelize");
var salt = bcrypt.genSaltSync(10);

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(data.password, salt);
      await db.User.create({
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        roleId: data.roleId,
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUsers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataUsers = await db.User.findAll({
        where: {
          firstName: {
            [Sequelize.Op.ne]: null,
          },
        },

        raw: true,
      });
      resolve(dataUsers);
    } catch (error) {
      reject(error);
    }
  });
};

const getUserEdit = async (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataUsers = await db.User.findOne({
        where: { id: idUser },
      });
      if (dataUsers) {
        resolve(dataUsers);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = async (dataUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataUserUpdate = await db.User.findOne({
        where: { id: dataUser.id },
        raw: false,
      });
      if (dataUserUpdate) {
        dataUserUpdate.firstName = dataUser.firstName;
        dataUserUpdate.lastName = dataUser.lastName;
        dataUserUpdate.address = dataUser.address;
        await dataUserUpdate.save();
        const AllUsers = await db.User.findAll({
          where: {
            firstName: {
              [Sequelize.Op.ne]: null,
            },
          },
        });
        resolve(AllUsers);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUser = async (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userDelete = await db.User.findOne({
        where: { id: idUser },
      });
      if (userDelete) {
        await db.User.destroy({ where: { id: idUser } });
        const AllUsers = await db.User.findAll({
          where: {
            firstName: {
              [Sequelize.Op.ne]: null,
            },
          },
        });
        resolve(AllUsers);
      } else {
        resolve({
          errCode: 2,
          errMessage: "The user isn't exist",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserEdit,
  updateUser,
  deleteUser,
};
