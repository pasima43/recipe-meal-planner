import { SPOONACULAR_API_KEY } from "./config.js";

const BASE_URL = "https://api.spoonacular.com";

async function request(path, params = {}) {
  const query = new URLSearchParams({ ...params, apiKey: SPOONACULAR_API_KEY });
  const response = await fetch(`${BASE_URL}${path}?${query}`);

  if (!response.ok) {
    if (response.status === 402) {
      throw new Error("Daily Spoonacular limit reached. Try again tomorrow.");
    }
    throw new Error(`Spoonacular request failed (status ${response.status}).`);
  }
  return response.json();
}

export async function searchRecipes(query, number = 12) {
  const data = await request("/recipes/complexSearch", { query, number });
  return data.results;
}

export async function getRecipeDetails(id) {
  return request(`/recipes/${id}/information`, { includeNutrition: true });
}