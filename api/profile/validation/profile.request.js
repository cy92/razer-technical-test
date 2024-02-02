const { check } = require("express-validator");

const addProfileRule = [
  check("firstName").notEmpty().withMessage("First name is mandatory"),
  check("lastName").notEmpty().withMessage("Last name is mandatory"),
  check("dob")
    .notEmpty()
    .withMessage("Date of birth is mandatory")
    .isDate({ format: "DD-MM-YYYY" })
    .withMessage("Invalid dob"),
  check("race").notEmpty().withMessage("Race is mandatory"),
  check("religion").notEmpty().withMessage("Religion is mandatory"),
  check("contact").notEmpty().withMessage("Contact is mandatory"),
  check("email")
    .notEmpty()
    .withMessage("E-mail is mandatory")
    .isEmail()
    .withMessage("Invalid e-mail"),
];

const editProfileRule = [
  check("firstName")
    .optional()
    .notEmpty()
    .withMessage("First name cannot be empty"),
  check("lastName")
    .optional()
    .notEmpty()
    .withMessage("Last name cannot be empty"),
  check("dob")
    .optional()
    .notEmpty()
    .withMessage("Date of birth cannot be empty")
    .isDate({ format: "DD-MM-YYYY" })
    .withMessage("Invalid dob"),
  check("race").optional().notEmpty().withMessage("Race cannot be empty"),
  check("religion")
    .optional()
    .notEmpty()
    .withMessage("Religion cannot be empty"),
  check("contact").optional().notEmpty().withMessage("Contact cannot be empty"),
  check("email")
    .optional()
    .notEmpty()
    .withMessage("E-mail cannot be empty")
    .isEmail()
    .withMessage("Invalid e-mail"),
  check("image").optional(),
];

module.exports = { addProfileRule, editProfileRule };
