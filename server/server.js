const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// env config # for heroku deployment
// require("dotenv").config({
//   path: ".env",
// });

const authUser = require("./routes/api/auth.api");
const userProfile = require("./routes/api/profile.api");
const question = require("./routes/api/question.api");
const assessment = require("./routes/api/assessment.api");
const assessmentQuestion = require("./routes/api/assessmentQuestion.api");
const candidate = require("./routes/api/candidate.api");
const home = require("./routes/api/home.api");
const home2 = require("./routes/api/home2.api");

const app = express();
app.use(cors());

// Bodyparser Middleware
app.use(bodyParser.json());

// connect to mongo
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`MongoDB connected successfully`))
  .catch((err) => console.log(err));

// use Routes
app.use("/api/auth", authUser);
app.use("/api/user", userProfile);
app.use("/api/user", question);
app.use("/api/user", assessment);
app.use("/api/user", assessmentQuestion);
app.use("/api/candidate", candidate);
app.use("/api/user/home", home);
app.use("/api/user/home2", home2);

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
