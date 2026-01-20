const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");
const Movie = require("./models/movie.model");
const movieRoutes = require("./routes/movie.routes");

env.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

movieRoutes(app);

app.get("/home", (req, res) => {
  console.log("Hitting /home endpoint");
  return res.json({ success: true, message: "Fetched Home" });
});

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");
    // await Movie.create({
    //   name: "Inception",
    //   description: "A mind-bending thriller",
    //   casts: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    //   trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    //   language: "English",
    //   releaseDate: "2010-07-16",
    //   director: "Christopher Nolan",
    //   releaseStatus: "RELEASED",
    // });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
});
