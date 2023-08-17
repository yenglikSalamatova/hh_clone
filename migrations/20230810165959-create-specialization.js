"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Specializations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      specializationTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "SpecializationTypes", // Название таблицы, на которую ссылается
          key: "id", // Ключ в таблице, на который ссылается
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Specializations");
  },
};
