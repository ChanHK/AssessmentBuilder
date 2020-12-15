const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// env config # for heroku deployment
require("dotenv").config({
  path: ".env",
});

const authUser = require("./routes/api/auth.api");
const userProfile = require("./routes/api/profile.api");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// connect to mongo
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB connected successfully`))
  .catch((err) => console.log(err));

// use Routes
app.use("/api/auth", authUser);
app.use("/api/user", userProfile);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
