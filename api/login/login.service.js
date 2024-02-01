const login = require("./login.model");
const crypto = require("../../util/crypto");

module.exports = {
  async findOne(query) {
    return await login.findOne(query);
  },

  // Encrypt password passed from api, encrypt and compare
  verifyLogin(login, password) {
    const encPass = crypto.encAes(password);

    return login.password === encPass;
  },
};
