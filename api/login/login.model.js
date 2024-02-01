const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  username: String,
  password: String,
  name: String,
});

module.exports = mongoose.model("Login", loginSchema);
