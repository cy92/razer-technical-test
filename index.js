require("dotenv").config();
const express = require("express");
const app = express();

const initDb = require("./util/mongo");
const serverPort = process.env.PORT;
app.use(express.json());

app.use("/login", require("./api/login/login.controller"));
app.use("/profile", require("./api/profile/profile.controller"));

try {
  initDb().then(() => {
    app.listen(serverPort, () => {
      console.log("Server started with port: " + serverPort);
    });
  });
} catch (error) {}
