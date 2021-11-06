"use strict";
const db = require("./models");
const routes = require("./routes");
const colors = require("colors");
const express = require("express");

const port = 4000;

const server = express();

server.get("/", (req, res) => {
  res.json({message: "Hello, World!"});
  console.log("Hello, World!".green);
});

db.sequelize.sync();

server.use("/api/users", routes);

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`.yellow);
});
