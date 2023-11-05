import bcrypt from "bcryptjs";
import db from "../models";
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
        gender: data.gender === "1" ? true : false,
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
      const dataUsers = await db.User.findAll({ raw: true });
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
      });
      if (dataUserUpdate) {
        dataUserUpdate.firstName = dataUser.firstName;
        dataUserUpdate.lastName = dataUser.lastName;
        dataUserUpdate.address = dataUser.address;
        await dataUserUpdate.save();
        const AllUsers = await db.User.findAll();
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
        await userDelete.destroy();
        const AllUsers = await db.User.findAll();
        resolve(AllUsers);
      } else {
        resolve(userDelete);
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
