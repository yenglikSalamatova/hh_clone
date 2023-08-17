const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Skill = require("../skills/Skill");
const Resume = require("./Resume");

const ResumeSkill = sequelize.define(
  "ResumeSkill",
  {
    // Здесь вы можете определить дополнительные поля промежуточной таблицы, если это необходимо.
  },
  { timestamps: false }
);

Resume.belongsToMany(Skill, {
  through: ResumeSkill,
  foreignKey: "resumeId",
  otherKey: "skillId", // Это айди навыка в модели Skill
  as: "skills",
});

Skill.belongsToMany(Resume, {
  through: ResumeSkill,
  foreignKey: "skillId",
  otherKey: "resumeId", // Это айди резюме в модели Resume
  as: "resumes",
});

module.exports = ResumeSkill;
