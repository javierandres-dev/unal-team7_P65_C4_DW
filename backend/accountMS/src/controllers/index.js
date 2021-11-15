"use strict";
const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Accounts = db.accounts;

exports.create = async (req, res) => {
  console.log("create: ", req.body);
  if (
    !req.body.id ||
    !req.body.userId ||
    !req.body.activities ||
    !req.body.endingBalance
  ) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }

  const account = {
    id: req.body.id,
    userId: req.body.userId,
    activities: req.body.activities,
    endingBalance: req.body.endingBalance,
  };

  Accounts.create(account)
    .then((data) => {
      res.json({ message: "Successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while create the Account",
      });
    });
};

exports.findAll = (req, res) => {
  Accounts.findAll()
    .then((data) => {
      res.json({ message: "Successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occured while retrieving Users",
      });
    });
};

exports.transfer = async (req, res) => {
  if (
    !req.body.activity ||
    !req.body.date ||
    !req.body.origin ||
    !req.body.destination ||
    !req.body.amount
  ) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }
  if (req.body.origin === req.body.destination) {
    res.status(400).json({
      message: "Destination can not be origin!",
    });
    return;
  }
  try {
    let origin = null;
    await Accounts.findOne({
      where: { id: req.body.origin },
    })
      .then((data) => {
        origin = data.dataValues;
      })
      .catch((err) => {
        origin = {
          message: `Error retrieving origin with id ${id}`,
        };
      });
    if (origin.endingBalance - req.body.amount >= 0) {
      let destination = null;
      await Accounts.findOne({
        where: { id: req.body.destination },
      })
        .then((data) => {
          destination = data.dataValues;
        })
        .catch((err) => {
          destination = {
            message: `Error retrieving destination with id ${id}`,
          };
        });
      //origin.activities.push(req.body);
      //destination.activities.push(req.body);
      console.log("req.body: ", req.body);
      console.log("origin: ", origin);
      console.log("destination: ", destination);
      console.log("END working....");
      res.json({ message: "soon..."});
    } else {
      res.status(400).json({ message: "Insufficient funds BACK" });
    }
  } catch (err) {
    res.status(err).json(err);
  }
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Accounts.findOne({ where: { userId: id } })
    .then((data) => {
      res.json({ message: "Successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error retrieving user with id ${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Accounts.update(req.body, {
    where: { id: id },
  }).then((data) => {
    if (data) {
      res.json({
        message: "Successfully",
        data: data,
      });
    } else {
      res.json({
        message: `Cannot update user with id ${id}`,
      });
    }
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Accounts.destroy({
    where: { id: id },
  }).then((data) => {
    if (data) {
      res.json({
        message: "Successfully",
        data: data,
      });
    } else {
      res.json({
        message: `Cannot delete user with id ${id}`,
      });
    }
  });
};
