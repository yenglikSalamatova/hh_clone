"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const employmentTypes = [
      { name: "Полная занятость" },
      { name: "Частичная занятость" },
      { name: "Проектная работа" },
      { name: "Волонтерство" },
      { name: "Стажировка" },
    ];

    await queryInterface.bulkInsert("EmploymentTypes", employmentTypes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("EmploymentTypes", null, {});
  },
};
