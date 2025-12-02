const { Schema, default: mongoose } = require("mongoose");

// Define User schema and model here
const userSchema = new Schema({
  firstName: { type: String, required: true, min: 3, max: 30 },
  lastName: { type: String },
  emailId: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, max: 50 },
  age: { type: Number, min: 18 },
  gender: { type: String, validate(value){
    if(!['male', 'female', 'other'].includes(value.toLowerCase())){
      throw new Error("Invalid gender value");
    }
  }},
  skills: {type:[String]},
  bio: { type: String, max: 250, default: "This is user Bio section" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
