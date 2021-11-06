"use strict";
module.exports = {
  HOST: "localhost",
  USER: "admin",
  PASSWORD: "123456",
  DB: "dbUsers",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};