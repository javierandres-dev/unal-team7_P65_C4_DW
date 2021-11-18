'use strict';
const db = require('../models');
const jwt = require('jsonwebtoken');

const Accounts = db.accounts;

exports.create = async (req, res) => {
  if (
    !req.body.id ||
    !req.body.userId ||
    !req.body.activities ||
    !req.body.endingBalance
  ) {
    res.status(400).json({
      message: 'Content can not be empty!',
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
      res.json({ message: 'Successfully', data: data });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while create the Account',
      });
    });
};

exports.findAll = (req, res) => {
  Accounts.findAll()
    .then((data) => {
      res.json({ message: 'Successfully', data: data });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occured while retrieving Users',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Accounts.findOne({ where: { userId: id } })
    .then((data) => {
      res.json({ message: 'Successfully', data: data });
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
        message: 'Successfully',
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
    where: { userId: id },
  }).then((data) => {
    if (data) {
      res.json({
        message: 'Successfully',
        data: data,
      });
    } else {
      res.json({
        message: `Cannot delete user with id ${id}`,
      });
    }
  });
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.json({ message: 'Token mandatory' });
  jwt.verify(token, 'shhhhh', (err, decoded) => {
    if (err) return res.json({ message: 'Token invalid', error: err });
    next();
  });
};
