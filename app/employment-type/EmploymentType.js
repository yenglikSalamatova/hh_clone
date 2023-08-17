const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const EmploymentType = sequelize.define(
  "EmploymentType",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Отключение автоматического добавления createdAt и updatedAt
  }
);

module.exports = EmploymentType;
