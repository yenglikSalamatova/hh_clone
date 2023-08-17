"use strict";

const City = require("../app/region/City");
const Country = require("../app/region/Country");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Получаем все страны СНГ
    const countries = await Country.findAll({
      attributes: ["id"], // Запрашиваем только столбец "id"
    });

    // Список городов СНГ с указанием идентификаторов стран
    const citiesData = [
      // Азербайджан
      {
        name: "Баку",
        countryId: countries[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Гянджа",
        countryId: countries[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Армения
      {
        name: "Ереван",
        countryId: countries[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Гюмри",
        countryId: countries[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Беларусь
      {
        name: "Минск",
        countryId: countries[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Гомель",
        countryId: countries[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Казахстан
      {
        name: "Алматы",
        countryId: countries[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Нур-Султан",
        countryId: countries[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Шымкент",
        countryId: countries[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Караганда",
        countryId: countries[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Актобе",
        countryId: countries[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Киргизия
      {
        name: "Бишкек",
        countryId: countries[4].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ош",
        countryId: countries[4].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Молдова
      {
        name: "Кишинёв",
        countryId: countries[5].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Тирасполь",
        countryId: countries[5].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Россия
      {
        name: "Москва",
        countryId: countries[6].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Санкт-Петербург",
        countryId: countries[6].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Новосибирск",
        countryId: countries[6].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Екатеринбург",
        countryId: countries[6].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Казань",
        countryId: countries[6].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Таджикистан
      {
        name: "Душанбе",
        countryId: countries[7].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Худжанд",
        countryId: countries[7].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Туркменистан
      {
        name: "Ашхабад",
        countryId: countries[8].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Туркменабат",
        countryId: countries[8].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Узбекистан
      {
        name: "Ташкент",
        countryId: countries[9].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Самарканд",
        countryId: countries[9].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Украина
      {
        name: "Киев",
        countryId: countries[10].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Харьков",
        countryId: countries[10].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Создаем записи о городах в базе данных
    await City.bulkCreate(citiesData);
  },

  down: async (queryInterface, Sequelize) => {
    // Удаляем все записи о городах из базы данных
    await City.destroy({ truncate: true });
  },
};
