require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();

const serverPort = process.env.PORT;
app.listen(serverPort, () => {
  console.log("Server started with port: " + serverPort);
});
