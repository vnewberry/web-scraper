const db = require("../models");

const axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
  app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.pdga.com/news").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $("li.views-row").each(function (i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.headline = $(this).text();
        result.URL = "testURL";
        // result.URL =
        // // $(this)
        // //   .children("a")
        // //   .attr("href");
        result.summary = "testsummary";
        result.image = "testimage";

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function (dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });
      });

      // Send a message to the client
      res.send("4Scrape Complete");
    });
  });

  app.get("/articles", function (req, res) {
    db.Article.find({})
      .then(function (dbArticle) {
        // If all Users are successfully found, send them back to the client
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurs, send the error back to the client
        res.json(err);
      });
    // TODO: Finish the route so it grabs all of the articles
  });
};
