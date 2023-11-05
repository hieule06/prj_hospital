import bcrypt from "bcryptjs";
import db from "../models";

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

module.exports = {
  validateLogin,
};
