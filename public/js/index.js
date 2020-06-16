// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      let newArticle = $(`<div id='article'></div>`);
      newArticle.append( `<img class='article-image' src='${data[i].image}' alt=''><ul><li><a href='https://www.pdga.com${data[i].URL}'>${data[i].headline}</a></li><li>Summary</li></ul>`)
      $("#article-container").append(newArticle);
    }
  });
 
