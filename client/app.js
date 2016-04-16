var recipeIds = [];

var app = {
  init: function() {
    console.log("Init has loaded.");
    $('#searchBar').on('submit', app.handleSearch);
  },
  
  handleSearch: function() {
    event.preventDefault();
    var input = $('#submissionField').val();
    console.log('Inside handleSearch: input from searchBar is:', input);
      app.searchRecipes(input);
      $('#submissionField').val('');
  },

  searchRecipes: function(input) {
   $('.recipeBlock').empty();

    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:3000',
      'content-type':'application/json',
      data: input,
      success: function(data) {
        app.displaySearch(data);
      },
      error: function() {
        console.log("Invalid query parameters");
      }
    });
  },

  displaySearch: function(data){
    var list = JSON.parse(data[0].body);

        list.recipes.forEach(function(recipe) {
          recipeIds.push(recipe['recipe_id']);
        $('.recipeBlock').append(
          '<div class="outsidePost">' +
            '<div class="post-container">' +
               '<h3 class="post-title">' + recipe.title + '</h3>' +
                 '<div class="post-thumb">' +
                '<div class="post-content">' +
                '<a href="' + recipe.f2f_url + '">' +
                    '<img class ="recipePics" src=" ' + recipe.image_url + '"/> ' + '</a>'
                + '</div>' + '<p id="ing">' + 'Ingredient List:' + '<script>' + app.getIngredients(recipe.recipe_id) + '</script>' +'</p>' +
                  '<p class="ingredients" id ="' + recipe['recipe_id'] + '">'  + '</p>' 
                + '</div>' 
          + '</div>' + '</div>'
         );
        })
 }, 

  getIngredients: function(id) {
    var recipeUrl = 'http://food2fork.com/api/get?key=eb83ffedca44fcdfbb67420382e5932e&rId=';
      $.ajax({
        dataType: 'json',
        'content-type': 'application/json',
        type: 'GET',
        url: recipeUrl + id,
        success: function(data) {
          data.recipe.ingredients.forEach(function(item) {
          $('#'+id).append(
            '<li class="ingredientList">' + 
             item
             +'</li>'
            );
          })
        },
        error: function() {
          console.log('error inside getIngredients');
        }  
      });
    }
  
};