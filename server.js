const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const routes = require("./Routes/index");
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// handle the CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./Config/passport")(passport);
// Routes
app.use('/', routes);


// DB Config
//const db = require("./config/keys").mongoURI;
const db = process.env.DB;
// Connect to MongoDB
mongoose
  .connect('',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  .then(success => {
    console.log("Database connected successfully");
  })
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
