const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Resume = require("./Resume");
const EmploymentType = require("../employment-type/EmploymentType");

const ResumeEmploymentType = sequelize.define(
  "ResumeEmploymentType",
  {
    // Здесь вы можете определить дополнительные поля промежуточнWой таблицы, если это необходимо.
  },
  { timestamps: false }
);

// Определение отношения "многие ко многим" между Resume и EmploymentType через промежуточную таблицу ResumeEmploymentType
Resume.belongsToMany(EmploymentType, {
  through: ResumeEmploymentType,
  foreignKey: "resumeId",
  as: "employmentTypes",
});

EmploymentType.belongsToMany(Resume, {
  through: ResumeEmploymentType,
  foreignKey: "employmentTypeId",
});

module.exports = ResumeEmploymentType;
