const express = require("express");
const { isAuthenticated } = require("./middlewares/auth");
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Vishal222",
    lastName: "Kumar",
    emailId: "vishal@kumar.com",
    password: "vishal@123",
    age: "30",
    gender: "male",
  });
  try {
    await user.save();
    res.send("User Created Successfully");
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Internal Server Error");
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
