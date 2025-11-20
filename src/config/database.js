const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://namastedev:GlY5AGfd8ZyFwPmO@namastenode.u5i1y6l.mongodb.net/"
    );
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = { connectDB };