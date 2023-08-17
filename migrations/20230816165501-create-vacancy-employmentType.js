// migrations/20210816155513-create-vacancy-employment-type.js
"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("VacancyEmploymentTypes", {
      vacancyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Vacancies",
          key: "id",
        },
        primaryKey: true,
      },
      employmentTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "EmploymentTypes",
          key: "id",
        },
        primaryKey: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("VacancyEmploymentTypes");
  },
};
