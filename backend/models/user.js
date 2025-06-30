const mongoose = require("mongoose");
const users = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  gender: { type: String },
});
module.exports = mongoose.model("users", users);
