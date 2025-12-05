const express = require("express");
const { isAuthenticated } = require("./middlewares/auth");
const app = express();
const { connectDB } = require("./config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validate");
app.use(express.json());
app.use(cookieParser());
// get user for specific emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).send("Internal Server Error");
  }
});

// get user by id
app.get("/userId", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send("Internal Server Error" + err.message);
  }
});

// delete user by id
app.delete("/user", async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete({_id: req.body.userId});
    const user = await User.findByIdAndDelete(req.body.userId);
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.status(200).send("user deleted successfully");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error" + err.message);
  }
});

// update user by id
app.patch("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "photoUrl",
      "skills",
      "bio",
    ];
    const isAllowedUpdate = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isAllowedUpdate) {
      throw new Error("invalid updates!");
    }

    if (data.skills.length > 10) {
      throw new Error("skills exceeded the limit of 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.status(200).send("user updated successfully");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error: " + err.message);
  }
});

// get all users details
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("no users found");
    } else {
      res.status(200).send(users);
    }
  } catch (err) {
    res.status(500).send("Internal Server Error" + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try{
    const {token} = req.cookies;
    if(!token){
      throw new Error("Unauthorized access, token missing");
    }
    const {_id} = await jwt.verify(token, "DEV@Tinder709");
    const user = await User.findById(_id);
    if(!user){
      throw new Error("User not found");
    }
    res.send(user);
  }catch(err){
    res.status(500).send("Internal Server Error" + err.message);
  }
});

app.get("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder709")
      res.cookie("token", token);
      res.status(200).send("Login Successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error " + err.message);
  }
});

app.post("/signup", async (req, res) => {
  try {
    // validate req body
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt password
    const passwordHash = await bcrypt.hash(password, 10);
    // Create new Instance of user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Created Successfully");
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).send("Internal Server Error " + err.message);
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
