const loginService = require("./login.service");
const router = require("express").Router();
const messageFormat = require("../../util/messageFormat");
const { loginRequest } = require("./validation/login.request");
const { validationResult } = require("express-validator");
const crypto = require("../../util/crypto");

router.post("/", loginRequest, async function (req, res) {
  if (!req.body)
    return res.status(400).send(messageFormat.onError("Invalid input"));

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(messageFormat.onError(errors));
    }

    // Find username if exist
    const findLogin = await loginService.findOne({
      username: req.body.username,
    });

    if (!findLogin)
      return res.status(400).send(messageFormat.onError("Login not found"));

    // Verify password
    const verifyPass = loginService.verifyLogin(findLogin, req?.body?.password);

    if (!verifyPass)
      return res.status(400).send(messageFormat.onError("Invalid login"));

    // Generate jwt token
    const jwt = crypto.generateToken(findLogin?.username, findLogin?.name);

    return res.send(
      messageFormat.onSuccess({
        username: findLogin.username,
        name: findLogin.name,
        jwtToken: jwt,
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send(messageFormat.onError(error));
  }
});

module.exports = router;
