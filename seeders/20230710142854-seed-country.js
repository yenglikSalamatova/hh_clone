"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const countries = [
      { name: "Азербайджан", createdAt: new Date(), updatedAt: new Date() },
      { name: "Армения", createdAt: new Date(), updatedAt: new Date() },
      { name: "Беларусь", createdAt: new Date(), updatedAt: new Date() },
      { name: "Казахстан", createdAt: new Date(), updatedAt: new Date() },
      { name: "Киргизия", createdAt: new Date(), updatedAt: new Date() },
      { name: "Молдова", createdAt: new Date(), updatedAt: new Date() },
      { name: "Россия", createdAt: new Date(), updatedAt: new Date() },
      { name: "Таджикистан", createdAt: new Date(), updatedAt: new Date() },
      { name: "Туркменистан", createdAt: new Date(), updatedAt: new Date() },
      { name: "Узбекистан", createdAt: new Date(), updatedAt: new Date() },
      { name: "Украина", createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert("Countries", countries, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Countries", null, {});
  },
};
