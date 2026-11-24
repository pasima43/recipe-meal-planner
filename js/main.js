import { searchRecipes } from "./spoonacularAPI.js";
import { showRecipeCards } from "./recipeCard.js";

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const results = document.querySelector("#results");
const statusMessage = document.querySelector("#status-message");

document.querySelector("#year").textContent = new Date().getFullYear();

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