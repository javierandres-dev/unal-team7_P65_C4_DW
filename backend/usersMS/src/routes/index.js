"use strict";
const controller = require("../controllers");
const express = require("express");

const router = express.Router();

router.post("/", controller.create);
//router.get("/", controller.findAll);
//router.get("/:id", controller.findOne);
//router.put("/:id", controller.update);
//router.delete("/:id", controller.delete);

/* router.get('/', function (req, res) {
  console.log("Hello, findAll!" .green);
  res.send('Hello, findAll!');
}); */

module.exports = router;