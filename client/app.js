var app = {

  init: function() {
    console.log("Init has loaded.");
    $('#searchBar').on('submit', app.handleSearch);
  },
  
  handleSearch: function() {
    event.preventDefault();
    var input = $('#recipeList').val();
    console.log('Inside handleSearch: input from searchBar is:', input);
    app.searchRecipes(input);
  },

  searchRecipes: function(input) {

    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:3000',
      'content-type':'application/json',
      data: input,
      success: function(data) {
        console.log("Inside search recipes - success: data is", JSON.parse(data.body));
        

      },
      error: function() {
        console.log("Invalid query parameters");
      }
    });
  }
  
};