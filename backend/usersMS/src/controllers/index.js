"use strict";
const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  console.log("create".yellow);
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }

  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  Users.create(user)
    .then((data) => {
      res.json({ result: data });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while create the Users",
      });
    });
};

exports.findAll = (req, res) => {
  console.log("findAll".yellow);
  Users.findAll()
    .then((data) => {
      res.json({ result: data });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occured while retrieving Users",
      });
    });
};

exports.findOne = (req, res) => {
  console.log("findOne".yellow);
  const id = req.params.id;
  Users.findByPk(id)
    .then((data) => {
      res.json({ result: data });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving user with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  console.log("update".yellow);
  const id = req.params.id;

  Users.update(req.body, {
    where: { id: id },
  }).then((data) => {
    if (data) {
      res.json({
        result: data,
      });
    } else {
      res.json({
        message: `Cannot update user with id=${id}`,
      });
    }
  });
};

exports.delete = (req, res) => {
  console.log("delete".yellow);
  const id = req.params.id;

  Users.destroy({
    where: { id: id },
  }).then((data) => {
    if (data) {
      res.json({
        result: data,
      });
    } else {
      res.json({
        message: `Cannot delete user with id=${id}`,
      });
    }
  });
};
