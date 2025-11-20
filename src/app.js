const express = require("express");
const { isAuthenticated } = require("./middlewares/auth");
const app = express();
const {connectDB} = require("./config/database");

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