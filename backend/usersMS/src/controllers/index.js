"use strict";
const db = require("../models");
const Users = db.users;

exports.create = (req, res) => {
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

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
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
