"use strict";
const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Accounts = sequelize.define("accounts", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    accountNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    initialDeposit: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dateInitialDeposit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    activity: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    endingBalance: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Accounts;
};
