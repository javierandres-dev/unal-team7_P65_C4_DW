"use strict";
const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = db.users;

exports.create = async (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }

  const isAdmin = req.body.isAdmin === true;
  let accountNumber = null;
  if (!isAdmin) {
    accountNumber = Date.now();
  }

  const hashPwd = await bcryptjs.hash(req.body.password, 1);

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPwd,
    isAdmin: isAdmin,
    accountNumber: accountNumber,
  };

  Users.create(user)
    .then((data) => {
      res.json({ message: "Successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while create the Users",
      });
    });
};

exports.findAll = (req, res) => {
  Users.findAll()
    .then((data) => {
      res.json({ message: "Successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occured while retrieving Users",
      });
    });
};

exports.login = async (req, res) => {
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

exports.findOne = (req, res) => {
  const id = req.params.id;
  Users.findByPk(id)
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

  Users.update(req.body, {
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

  Users.destroy({
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