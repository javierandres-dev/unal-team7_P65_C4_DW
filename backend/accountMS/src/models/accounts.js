"use strict";
const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Accounts = sequelize.define("accounts", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    activities: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: false,
      defaultValue: [],
    },
    endingBalance: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Accounts;
};
