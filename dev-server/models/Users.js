const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  avatar: String
});
userSchema.set("timestamps", true);

module.exports = User = mongoose.model("user", userSchema);