// Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

// Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

// Requiring all models
// const db = require("./models");

// Initializing the port
const PORT = process.env.PORT || 3000;

// Initializing Express
const app = express();

// Middleware
    // Use morgan logger for logging requests
    app.use(logger("dev"));
    // Parse request body as JSON
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    // Make public a static folder
    app.use(express.static("public"));

// Using Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "/views/layouts")
}));
app.set('views', path.join(__dirname, '/views'));
app.set("view engine", "handlebars");

// require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);
// Connecting to the Mongo DB
// mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.listen(PORT, function () {
    console.log('App running on http://localhost:' + PORT + '/');
});