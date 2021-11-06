"use strict";
const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
      username: Sequelize.STRING,
      password: Sequelize.STRING,
  });
  return User;
};