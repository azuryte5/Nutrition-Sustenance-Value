var cuisineType = "";
var healthType = "";

function generateRecipes() {
  // ingredients pulled from input
  var ingredients = document.querySelector("#ingredient").value;
  console.log(ingredients);
  //API URL with ingredients input added
  var apiURL = "https://api.edamam.com/api/recipes/v2?type=public&q=" + ingredients + "&app_id=d79a6135&app_key=%20640f82c48f99da84b3fcbf2e006bd954&ingr=1-10&diet=balanced&health=gluten-free&health=tree-nut-free&cuisineType=American&cuisineType=Asian&cuisineType=British&cuisineType=Chinese&cuisineType=Eastern%20Europe&cuisineType=Indian&cuisineType=Italian&cuisineType=Japanese&time=0-20&imageSize=REGULAR&random=true&field=uri&field=label&field=image&field=source&field=url&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=ingredientLines&field=ingredients&field=calories&field=totalWeight&field=totalTime&field=cuisineType&field=mealType&field=dishType&field=totalNutrients&field=totalDaily"

    fetch(apiURL)
    .then(function(response) {
      //request was successful
      if (response.ok) {
        response.json().then(function(data) {
        console.log(data);

        var recipeContainer = document.getElementById("recipe-card-container");
        recipeContainer.innerHTML = "";
        
        for (var i = 0; i <=2; i++) {
          var recipeEl = document.createElement("div");
          recipeEl.classList = "text-center";
          recipeEl.setAttribute("id", "generate");
          recipeEl.innerHTML = data.hits[i].recipe.label + "<br />";
          console.log(data.hits[i].recipe.label);
          recipeEl.innerHTML+= "Serves: " + data.hits[i].recipe.yield +  "<br />";
          recipeEl.innerHTML+= '<img src=' + data.hits[i].recipe.image + ' <br />';
          recipeEl.innerHTML+= "Ingrediets: " + data.hits[i].recipe.ingredientLines +  "<br /> <br />";
          recipeEl.innerHTML+= "Go to the recipe: <a href='url'>" + data.hits[i].recipe.url + "</a> <br />";
          recipeContainer.appendChild(recipeEl);

        };
        });
      };
    });
}


// This is for the dropdown plug in to get them to work
$(function() {
  $(".chosen-select").chosen({
    max_selected_options: 3,
    width: "90%"});
});

// Button one logs the choices console log entry can be stored as a variable
// It's not an array though, it strings the words with the single space at present.
$("#button").on("click", function() {
  // console.log($("#cuisine_chosen .result-selected").text())
  var cuisineType = $("#cuisine_chosen .result-selected").text()  
  console.log(cuisineType);  
  var healthType = $("#health_chosen .result-selected").text()
  console.log(healthType);
})

