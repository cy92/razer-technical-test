const mongoose = require("mongoose");
const race = require("./enum/race.enum");
const religion = require("./enum/religion.enum");

const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: String,
  address: String,
  race: {
    type: String,
    enum: race,
  },
  religion: {
    type: String,
    enum: religion,
  },
  contact: String,
  email: String,
  image: String,
  updatedAt: Date,
  updatedBy: String,
  addedAt: Date,
  addedBy: String,
  deleted: Boolean,
  deletedBy: String,
  deletedAt: Date,
});

module.exports = mongoose.model("Profile", profileSchema);
