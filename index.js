const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");

env.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/home", (req, res) => {
  console.log("Hitting /home endpoint");
  return res.json({ success: true, message: "Fetched Home" });
});

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
});
