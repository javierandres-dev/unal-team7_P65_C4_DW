"use strict";
const db = require("./models");
const routes = require("./routes");
const cors = require("cors");
const express = require("express");

db.sequelize.sync();

const port = 5000;

const server = express();

server.use(cors());
server.use(express.json());
server.use("/account", routes);

server.get("/", (req, res) => {
  res.json({ message: "AccountMS Works!" });
});

server.listen(port, () => {
  console.log(`\n\tServer listening at http://localhost:${port}\n`);
});
