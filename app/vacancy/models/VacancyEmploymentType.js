// models/VacancyEmploymentType.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const VacancyEmploymentType = sequelize.define("VacancyEmploymentType", {
  vacancyId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Vacancies",
      key: "id",
    },
  },
  employmentTypeId: {
    type: DataTypes.INTEGER,
    references: {
      model: "EmploymentTypes",
      key: "id",
    },
  },
});

module.exports = VacancyEmploymentType;
