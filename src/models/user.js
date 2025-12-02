const { Schema, default: mongoose } = require("mongoose");
const validator = require("validator");
// Define User schema and model here
const userSchema = new Schema(
  {
    firstName: { type: String, required: true, min: 3, max: 30 },
    lastName: { type: String },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format");
        }
      },
    },
    password: { type: String, required: true, max: 50 },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value.toLowerCase())) {
          throw new Error("Invalid gender value");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL format");
        }
      },
    },
    skills: { type: [String] },
    bio: { type: String, max: 250, default: "This is user Bio section" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
