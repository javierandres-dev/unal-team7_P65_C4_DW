"use strict";
const db = require("../models");
const Users = db.users;
//const Op = db.Sequelize.Op;

exports.create = (req, res) => {  
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
    return;
  }

  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  Users.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while create the Users",
      });
    });
};

exports.findAll = (req, res) => {
  const username = req.query.username;

  Users.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving Users",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Users.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Users.update(req.body, {
    where: { id: id },
  }).then((data) => {
    if (data) {
      res.send({
        message: "user was updated successfully",
      });
    } else {
      res.send({
        message: `Cannot update user with id=${id}`,
      });
    }
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  user.destroy({
    where: { id: id },
  }).then((data) => {
    if (data) {
      res.send({
        message: "user was delete successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete user with id=${id}`,
      });
    }
  });
};