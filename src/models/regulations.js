"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Regulation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Regulation.hasMany(models.User, {
        foreignKey: "positionId",
        as: "positionData",
      });
      Regulation.hasMany(models.User, {
        foreignKey: "gender",
        as: "genderData",
      });
    }
  }
  Regulation.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Regulation",
    }
  );
  return Regulation;
};
