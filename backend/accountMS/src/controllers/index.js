"use strict";
const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Accounts = db.accounts;

exports.create = async (req, res) => {
  if (
    !req.body.userId ||
    !req.body.accountNumber ||
    !req.body.initialDeposit ||
    !req.body.dateInitialDeposit ||
    !req.body.activity ||
    !req.body.endingBalance
  ) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }

  const account = {
    userId: req.body.userId,
    accountNumber: req.body.accountNumber,
    initialDeposit: req.body.initialDeposit,
    dateInitialDeposit: req.body.dateInitialDeposit,
    activity: req.body.activity,
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
/*
exports.signup = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }

  try {
    const user = await Users.findOne({ where: { email: req.body.username } });
    if (user) {
      if (await bcryptjs.compare(req.body.password, user.password)) {
        const payload = {
          id: user.id,
          check: true,
        };
        const token = jwt.sign(payload, "shhhhh", {
          expiresIn: "3600000",
        });
        res.json({ message: "Successfully", token: token });
      } else {
        res.status(400).json({ message: "Incorrect username and/or password" });
      }
    } else {
      res.status(400).json({ message: "Incorrect username and/or password" });
    }
  } catch (err) {
    res.status(err).json(err);
  }
};
*/
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
