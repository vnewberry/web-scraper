// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      let newArticle = $(`<div id='article'></div>`);
      newArticle.append( `<img class='article-image' src='${data[i].URL}' alt=''><ul><li>${data[i]._id}</li><li>${data[i].headline}</li></ul>`)
      $("#article-container").append(newArticle);
    }
  });
 
