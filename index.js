const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");

const movieRoutes = require("./routes/movie.routes");
const theatreRoutes = require("./routes/theatre.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const bookingRoutes = require("./routes/booking.route");

env.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

authRoutes(app);
movieRoutes(app);
theatreRoutes(app);
userRoutes(app);
bookingRoutes(app);

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
});
