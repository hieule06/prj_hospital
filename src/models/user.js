"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Regulation, {
        foreignKey: "positionId",
        targetKey: "keyMap",
        as: "positionData",
      });
      User.belongsTo(models.Regulation, {
        foreignKey: "gender",
        targetKey: "keyMap",
        as: "genderData",
      });

      User.hasOne(models.Infor_Doctor, { foreignKey: "doctorId" });
      User.hasMany(models.Booking, {
        foreignKey: "patientsId",
        as: "patientData",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      positionId: DataTypes.STRING,
      image: DataTypes.BLOB,
      roleId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
