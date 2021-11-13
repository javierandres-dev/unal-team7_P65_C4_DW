"use strict";
const db = require("./models");
const routes = require("./routes");
const cors = require("cors");
const express = require("express");

db.sequelize.sync();

const port = 4000;

const server = express();

server.use(cors());
server.use(express.json());
server.use("/auth", routes);

server.get("/", (req, res) => {
  res.json({ message: "Auth Works!" });
});

server.listen(port, () => {
  console.log(`\n\tServer listening at http://localhost:${port}\n`);
});
