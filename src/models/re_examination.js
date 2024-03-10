"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Re_Examination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Re_Examination.belongsTo(models.User, {
        foreignKey: "patientsId",
        targetKey: "id",
        as: "patientReExamination",
      });
    }
  }
  Re_Examination.init(
    {
      patientsId: DataTypes.INTEGER,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Re_Examination",
    }
  );
  return Re_Examination;
};
