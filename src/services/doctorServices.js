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

module.exports = {
  getDataDoctors,
};
