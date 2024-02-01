const { check } = require("express-validator");

const loginRequest = [
  check("username").notEmpty().withMessage("Username is mandatory"),
  check("password").notEmpty().withMessage("Password is mandatory"),
];

module.exports = { loginRequest };
