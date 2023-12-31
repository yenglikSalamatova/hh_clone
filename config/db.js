const { Sequelize } = require("sequelize");
const dbConfig = require("./config");
const fs = require("fs");
const path = require("path");

// Получите данные для конкретной среды (development, test, production)
const environment = process.env.NODE_ENV || "development";
const config = dbConfig[environment];

// console.log(environment);
// console.log(config);

// Создайте экземпляр Sequelize с настройками подключения к вашей базе данных PostgreSQL
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.resolve("config", "ca-certificate.crt")),
      },
    },
  }
);

// Синхронизируйте модель с базой данных
sequelize
  .sync()
  .then(async () => {
    console.log("Модель синхронизирована с базой данных.");
  })
  .catch((error) => {
    console.error("Ошибка синхронизации модели:", error);
  });

module.exports = sequelize;
