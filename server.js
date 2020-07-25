// Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
// var bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
// Initializing the port
const PORT = process.env.PORT || 3000;

// Initializing Express
const app = express();

var routes = require("./routes");
// Middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Using Handlebars

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");
app.use(routes);

// Connecting to the Mongo DB
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(PORT, function () {
  console.log("App running on http://localhost:" + PORT + "/");
});
