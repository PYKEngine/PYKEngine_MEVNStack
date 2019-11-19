const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  avatar: String
});
adminSchema.set("timestamps", true);

module.exports = Admin = mongoose.model("admin", adminSchema);