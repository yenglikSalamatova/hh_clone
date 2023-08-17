const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Resume = require("./Resume");

const WorkingHistory = sequelize.define(
  "WorkingHistory",
  {
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true, // Может быть null, если сотрудник еще работает на этой позиции
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { timestamps: false } // Не добавляем createdAt и updatedAt
);

// Определяем связь "один-к-одному" с моделью Resume
WorkingHistory.belongsTo(Resume, { foreignKey: "resumeId" });
Resume.hasMany(WorkingHistory, {
  foreignKey: "resumeId",
  as: "workingHistories",
});
module.exports = WorkingHistory;
