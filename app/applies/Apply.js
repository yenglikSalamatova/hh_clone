const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Resume = require("../resume/Resume");
const Vacancy = require("../vacancy/models/Vacancy");

const Apply = sequelize.define("Apply", {
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Apply.belongsTo(Resume, { foreignKey: "resumeId", as: "resume" });
Apply.belongsTo(Vacancy, { foreignKey: "vacancyId", as: "vacancy" });

Resume.hasMany(Apply, { foreignKey: "resumeId", as: "applies" });
Vacancy.hasMany(Apply, { foreignKey: "vacancyId", as: "applies" });

module.exports = Apply;
