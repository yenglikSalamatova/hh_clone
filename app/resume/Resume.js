const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const City = require("../region/City");

const User = require("../auth/User");
const Citizenship = require("../region/Country");

const Resume = sequelize.define(
  "Resume",
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salary_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    main_language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

Resume.belongsTo(City, { foreignKey: "cityId", as: "city" });
Resume.belongsTo(User, { foreignKey: "userId" });
Resume.belongsTo(Citizenship, {
  foreignKey: "citizenshipId",
  as: "citizenship",
});

module.exports = Resume;
