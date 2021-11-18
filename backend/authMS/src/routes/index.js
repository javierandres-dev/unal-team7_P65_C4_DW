'use strict';
const controller = require('../controllers');
const express = require('express');

const router = express.Router();

router.post('/login', controller.login);
router.post('/', controller.authenticateToken, controller.create);
router.get('/', controller.authenticateToken, controller.findAll);
router.get('/:id', controller.authenticateToken, controller.findOne);
router.put('/:id', controller.authenticateToken, controller.update);
router.delete('/:id', controller.authenticateToken, controller.delete);

module.exports = router;
