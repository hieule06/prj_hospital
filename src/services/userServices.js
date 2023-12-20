import bcrypt from "bcryptjs";
import db from "../models";
var salt = bcrypt.genSaltSync(10);

const validateLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataReturn = {};
      const userData = await checkEmail(email);
      if (userData) {
        const comparePassword = bcrypt.compareSync(password, userData.password);
        if (comparePassword) {
          dataReturn.errCode = 0;
          dataReturn.errMessage = "Ok";
          delete userData.password;
          dataReturn.user = userData;
          resolve(dataReturn);
        } else {
          dataReturn.errCode = 3;
          dataReturn.errMessage = "Wrong password!";
          resolve(dataReturn);
        }
      } else {
        dataReturn.errCode = 2;
        dataReturn.errMessage =
          "Your email isn't exist in your system. pls enter other your email!";
        resolve(dataReturn);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const checkEmail = (emailUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email: emailUser },
        raw: true,
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

const getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";

      if (userId === "All") {
        user = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "All") {
        user = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

const createNewUser = async (dataUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(dataUser.password, salt);
      await db.User.create({
        email: dataUser.email,
        password: hashPassword,
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        address: dataUser.address,
        gender: dataUser.gender,
        phoneNumber: dataUser.phoneNumber,
        positionId: dataUser.positionId,
        roleId: dataUser.roleId,
        image: dataUser.avatar,
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

const deleteUser = async (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userDelete = await db.User.findOne({
        where: { id: idUser },
      });
      if (userDelete) {
        await db.User.destroy({ where: { id: idUser } });
        resolve({
          errCode: 0,
          errMessage: "Delete user success!",
        });
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

const updateUser = async (dataUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!dataUser.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      } else {
        let dataUserUpdate = await db.User.findOne({
          where: { id: dataUser.id },
          raw: false,
        });
        if (dataUserUpdate) {
          dataUserUpdate.firstName = dataUser.firstName;
          dataUserUpdate.lastName = dataUser.lastName;
          dataUserUpdate.address = dataUser.address;
          dataUserUpdate.phoneNumber = dataUser.phoneNumber;
          dataUserUpdate.gender = dataUser.gender;
          dataUserUpdate.roleId = dataUser.roleId;
          dataUserUpdate.positionId = dataUser.positionId;
          dataUserUpdate.image = dataUser.image;
          await dataUserUpdate.save();
          const AllUsers = await db.User.findAll();
          resolve({
            errCode: 0,
            errMessage: "Update success!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "User not found!",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getRegulation = async (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataRegulation = await db.Regulation.findAll({
        where: { type: type },
        raw: false,
      });
      if (dataRegulation) {
        resolve({
          errCode: 0,
          errMessage: "get data Regulation success!",
          data: dataRegulation,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "dataRegulation not found!",
          data: dataRegulation,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  validateLogin,
  checkEmail,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
  getRegulation,
};
