// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#article-container").append(`<img src ='${data[i].URL}' />`);
    }
  });
 
