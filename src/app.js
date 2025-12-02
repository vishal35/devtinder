const express = require("express");
const { isAuthenticated } = require("./middlewares/auth");
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");
app.use(express.json());

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
  try{
    const user = await User.findById(req.body.userId);
    if(!user){
      res.status(404).send("user not found");
    }else{
      res.status(200).send(user);
    }
  } catch(err){
    res.status(500).send("Internal Server Error" + err.message);
  }
});

// delete user by id
app.delete("/user", async (req, res) => {
  try{
    // const user = await User.findByIdAndDelete({_id: req.body.userId}); 
    const user = await User.findByIdAndDelete(req.body.userId); 
    if(!user){
      res.status(404).send("user not found");
    } else{
      res.status(200).send("user deleted successfully");
    }
  } catch(err){
    res.status(500).send("Internal Server Error" + err.message);
  }
});

// update user by id
app.patch("/user", async (req, res) => {
  const data = req.body;
  try{
    const user = await User.findByIdAndUpdate({_id: req.body.userId}, data, {runValidators: true}); 
    if(!user){
      res.status(404).send("user not found");
    } else{
      res.status(200).send("user updated successfully");
    }
  } catch(err){
    res.status(500).send("Internal Server Error" + err.message);
  }
});

// get all users details
app.get("/feed", async (req, res) => {
  try{
    const users = await User.find({});
    if(users.length === 0){
      res.status(404).send("no users found");
    }else{
      res.status(200).send(users);
    }
  } catch(err){
    res.status(500).send("Internal Server Error" + err.message);
  }
});

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
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
