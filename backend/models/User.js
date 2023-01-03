const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, uppercase: true, trim: true },
  age: { type: Number, min: 0, max: 100 },
  email: { type: String, required: true, lowercase: true },
  role: {
    type: String,
    default: "client",
    enum: ["client", "admin", "superAdmin"],
  },
  password: { type: String, required: true },
  isBanned: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now() },
});
module.exports = User = mongoose.model("user", userSchema);
