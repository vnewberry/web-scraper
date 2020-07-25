const axios = require("axios");
const cheerio = require("cheerio");

const scrape = function () {
  return axios.get("https://www.pdga.com/news").then(function (res) {
    const $ = cheerio.load(res.data);
    console.log("scraping");
    let articles = [];

    $("li.views-row").each(function (i, element) {
      let head = $(this).children("div.views-field-title")
      .text()
      .trim();

     
      let url = $(this).find("a").attr("href");

     
      let sum = "test";
    //   $(this).find("p").text().trim();

        let image = $(this).find("img").attr("src");

      if (head && sum && url && image) {
     
        let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        // let sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        var dataToAdd = {
            headline: headNeat,
            summary: sum,
            url: "https://www.pdga.com" + url,
            image: image
          };
          articles.push(dataToAdd);
        }
    });
    return articles;
  });
};
module.exports = scrape;