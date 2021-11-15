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
      type: Sequelize.STRING,
      get: function () {
        return JSON.parse(this.getDataValue("activities"));
      },
      set: function (val) {
        return this.setDataValue("activities", JSON.stringify(val));
      },
    },
    endingBalance: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Accounts;
};
