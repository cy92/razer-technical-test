const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const opt = {
  expiresIn: "1h",
};

const aesAlgo = "aes-256-cbc";
const encIv = Buffer.from("00000000", "utf8").toString("hex");

module.exports = {
  // Verify jwt token
  verifyJwt(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  // Generate jwt token base on username and name format
  generateToken(username, name) {
    const payload = {
      username: username,
      name: name,
    };
    try {
      return jwt.sign(payload, process.env.JWT_SECRET, opt);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  // AES 256 encryption with padding
  encAes(rawStr) {
    try {
      const key = process.env.ENC_KEY;
      const cipher = crypto.createCipheriv(aesAlgo, key, encIv);
      let encText = cipher.update(rawStr);
      encText = Buffer.concat([encText, cipher.final()]);
      return encText.toString("base64");
    } catch (error) {
      throw error;
    }
  },
};
