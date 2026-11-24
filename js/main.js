import { searchRecipes, getRecipeDetails } from "./spoonacularAPI.js";
import { showRecipeCards, createRecipeDetails } from "./recipeCard.js";

const statusMessage = document.querySelector("#status-message");
document.querySelector("#year").textContent = new Date().getFullYear();

function initSearchPage(form) {
  const input = document.querySelector("#search-input");
  const results = document.querySelector("#results");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    statusMessage.textContent = "Searching...";
    results.replaceChildren();

    try {
      const recipes = await searchRecipes(query);

      if (recipes.length === 0) {
        statusMessage.textContent = `No recipes found for "${query}".`;
        return;
      }

      statusMessage.textContent = `Showing ${recipes.length} recipes for "${query}".`;
      showRecipeCards(recipes, results);
    } catch (error) {
      statusMessage.textContent = error.message;
    }
  });
}

async function initRecipePage(container) {
  const id = new URLSearchParams(window.location.search).get("id");

  if (!id) {
    statusMessage.textContent = "No recipe selected. Go back and pick one.";
    return;
  }

  statusMessage.textContent = "Loading recipe...";

  try {
    const recipe = await getRecipeDetails(id);
    document.title = `${recipe.title} | Recipe and Meal Planner`;
    container.replaceChildren(createRecipeDetails(recipe));
    statusMessage.textContent = "";
  } catch (error) {
    statusMessage.textContent = error.message;
  }
}

const searchForm = document.querySelector("#search-form");
const recipeDetails = document.querySelector("#recipe-details");

if (searchForm) initSearchPage(searchForm);
if (recipeDetails) initRecipePage(recipeDetails);