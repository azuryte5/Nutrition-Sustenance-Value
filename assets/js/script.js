var cuisineType = "";
var healthType = "";

function generateRecipes() {

// captures drop down inputs and joins them with & to fit API needs
  var cuisineType = $("#cuisine_chosen .result-selected") 
    .map(function() {
      return "cuisineType=" + this.innerHTML;
    })
    .get()
    .join("&");
  console.log(cuisineType); 

  var healthType = $("#health_chosen .result-selected")
    .map(function() {
      return "healthType=" + this.innerHTML;
    })
    .get()
    .join("&");
  console.log(healthType);

  // ingredients pulled from input
  var ingredients = document.querySelector("#ingredient").value;
  console.log(ingredients);
  //API URL with ingredients input added
  var apiURL = "https://api.edamam.com/api/recipes/v2?type=public&q=" 
  + ingredients 
  + "&app_id=d79a6135&app_key=%20640f82c48f99da84b3fcbf2e006bd954&ingr=1-10&diet=balanced&health=gluten-free&health=tree-nut-free&"
  + cuisineType
  + "&time=0-20&imageSize=REGULAR&random=true&field=uri&field=label&field=image&field=source&field=url&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=ingredientLines&field=ingredients&field=calories&field=totalWeight&field=totalTime&field=cuisineType&field=mealType&field=dishType&field=totalNutrients&field=totalDaily"

    fetch(apiURL)
    .then(function(response) {
      //request was successful
      if (response.ok) {
        response.json().then(function(data) {
        console.log(data);

        //grabbing where the recipe cards will go, and setting it to empty to clear if repeat searches are done
        var recipeContainer = document.getElementById("recipe-card-container");
        recipeContainer.innerHTML = "";

        // for loop to populate 3 recipe cards with info captured from the API
        for (var i = 0; i <=2; i++) {
          var recipeEl = document.createElement("div");
          recipeEl.classList = "text-center";
          recipeEl.setAttribute("id", "generate");
          recipeEl.innerHTML = data.hits[i].recipe.label + "<br />";
          console.log(data.hits[i].recipe.label);
          recipeEl.innerHTML+= "Serves: " + data.hits[i].recipe.yield +  "<br />";
          recipeEl.innerHTML+= '<img src="' + data.hits[i].recipe.image + '"> <br />';
          recipeEl.innerHTML+= "Ingrediets: " + data.hits[i].recipe.ingredientLines +  "<br /> <br />";
          recipeEl.innerHTML+= "<a href='" + data.hits[i].recipe.url + "' target='_blank'>Click here to go to the recipe!</a> <br />";
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
    width: "90%",
  });
});

// Content for the map with working access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiYXp1cnl0ZSIsImEiOiJja3U5dGpsbjYwYTZnMnZubmVtZXZ4bzcyIn0.4TNon4_EuBE9I_4Xg-U7kQ";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-75.69, 45.42], // starting position [lng, lat]
  zoom: 12, // starting zoom
});

