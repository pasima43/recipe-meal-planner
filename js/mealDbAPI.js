const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`TheMealDB request failed (status ${response.status}).`);
  }
  return response.json();
}

export async function getCategories() {
  const data = await request("/list.php?c=list");
  return data.meals.map((item) => item.strCategory);
}

export async function getCuisines() {
  const data = await request("/list.php?a=list");
  return data.meals.map((item) => item.strArea);
}

export async function filterByCategory(category) {
  const data = await request(`/filter.php?c=${encodeURIComponent(category)}`);
  return data.meals || [];
}

export async function filterByCuisine(cuisine) {
  const data = await request(`/filter.php?a=${encodeURIComponent(cuisine)}`);
  return data.meals || [];
}

export async function getRandomMeal() {
  const data = await request("/random.php");
  return data.meals[0];
}