const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authUser = require("./routes/api/auth.api");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;
// require("dotenv").config();

// connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB connected successfully`))
  .catch((err) => console.log(err));

// use Routes
app.use("/api/user", authUser);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
