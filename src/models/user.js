const { Schema, default: mongoose } = require("mongoose");

// Define User schema and model here
const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  emailId: { type: String },
  password: { type: String },
  age: { type: Number },
  gender: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
