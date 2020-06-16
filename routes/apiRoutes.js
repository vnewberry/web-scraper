const db =require("../models");

const axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with axios
        axios.get("http://www.echojs.com/").then(function(response) {
          // Then, we load that into cheerio and save it to $ for a shorthand selector
          var $ = cheerio.load(response.data);
      
          // Now, we grab every h2 within an article tag, and do the following:
          $("article h2").each(function(i, element) {
            // Save an empty result object
            var result = {};
      
            // Add the text and href of every link, and save them as properties of the result object
            result.headline = $(this)
              .children("a")
              .text();
            result.URL = $(this)
              .children("a")
              .attr("href");
            result.summary = "testsummary";
            result.image = "testimage";
         
            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
              .then(function(dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
              })
              .catch(function(err) {
                // If an error occurred, log it
                console.log(err);
              });
          });
      
          // Send a message to the client
          res.send("2Scrape Complete");
        });
      });
}