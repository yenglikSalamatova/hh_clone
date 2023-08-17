const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const City = require("../../region/City");
const User = require("../../auth/User");
const Company = require("../../auth/Company");
const Specialization = require("../../specializations/models/Specialization");
const Experience = require("../models/Experience");
const EmploymentType = require("../../employment-type/EmploymentType");
const VacancyEmploymentType = require("./VacancyEmploymentType");

const Vacancy = sequelize.define(
  "Vacancy",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary_from: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    salary_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    salary_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    about_company: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { timestamps: true }
);

Vacancy.belongsTo(City, { foreignKey: "cityId", as: "city" });
Vacancy.belongsTo(User, { foreignKey: "userId" });
Vacancy.belongsTo(Company, { foreignKey: "companyId", as: "company" });
Vacancy.belongsTo(Specialization, {
  foreignKey: "specializationId",
  as: "specialization",
});
Vacancy.belongsTo(Experience, { foreignKey: "experienceId", as: "experience" });
Vacancy.belongsToMany(EmploymentType, {
  through: VacancyEmploymentType,
  foreignKey: "vacancyId",
  otherKey: "employmentTypeId",
  as: "employmentType",
});
EmploymentType.belongsToMany(Vacancy, {
  through: VacancyEmploymentType,
  foreignKey: "employmentTypeId",
  otherKey: "vacancyId",
  as: "vacancy",
});
module.exports = Vacancy;
