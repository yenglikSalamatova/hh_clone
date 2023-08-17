const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Skill = sequelize.define("Skill", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Skill;
