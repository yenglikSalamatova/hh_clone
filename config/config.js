require("dotenv").config({ path: "../config.env" });
const fs = require("fs");
const path = require("path");

module.exports = {
  development: {
    username: "admin",
    password: "root",
    database: "admin",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "doadmin",
    password: process.env.DATABASE_PASSWORD,
    host: "db-postgresql-fra1-44132-do-user-14536331-0.b.db.ondigitalocean.com",
    dialect: "postgres",
    port: 25060,
    database: "defaultdb",
    sslmode: "require",
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.resolve("config", "ca-certificate.crt")),
      },
    },
  },
};
