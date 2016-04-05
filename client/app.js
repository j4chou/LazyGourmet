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

  // displayRecipe: function(item) {
  //   item.recipes.forEach(function(recipe) {
  //     console.log('recipe.title is', recipe.title);
  //   })
  // },
  searchRecipes: function(input) {
   $('.recipeBlock').empty();

    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:3000',
      'content-type':'application/json',
      data: input,
      success: function(data) {
        var list = JSON.parse(data.body);
        list.count = 10;
        list.recipes.length = 10;
        console.log('list is', list);

        list.recipes.forEach(function(recipe) {
          console.log('recipe.title is', recipe.title);
          console.log('image url is', recipe.image_url);

          // $('.recipeBlock').append(
          //     '<span>' + recipe.title + '</span>' + '<br>' +
          //     '<img class="recipePics" align="left" src="'+ recipe.image_url +'"/><br>'
          //   );

        $('.recipeBlock').append(
            '<div class="post-container">' +
    '<h3 class="post-title">' + recipe.title + '</h3>' +
    '<div class="post-thumb">' +
    '<img class ="recipePics" src=" ' + recipe.image_url + '"/> ' + '</div>' +
    '<div class="post-content">' +
        '<p>' + '</p>' + '</div>' + '</div>'
         );
        });

      },
      error: function() {
        console.log("Invalid query parameters");
      }
    });
  }

  // retrieveVideos: function(input) {
  //   $.ajax({
  //     type: 'POST',
  //     url: 'http://127.0.0.1:3000',
  //     'content-type':'application/json',
  //     data: input,
  //     success: function(data) {
  //       console.log('data inside retrieveVideos is', data);

  //     },
  //     error: function() {
  //       console.log("Invalid query parameters");
  //     }
  //   });
  // }

  
};