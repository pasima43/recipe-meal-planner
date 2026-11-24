export function createRecipeCard(recipe) {
  const card = document.createElement("article");
  card.className = "recipe-card";

  const image = document.createElement("img");
  image.className = "recipe-card__image";
  image.src = recipe.image;
  image.alt = recipe.title;
  image.loading = "lazy";

  const body = document.createElement("div");
  body.className = "recipe-card__body";

  const title = document.createElement("h3");
  title.className = "recipe-card__title";
  title.textContent = recipe.title;

  const link = document.createElement("a");
  link.className = "btn btn--primary";
  link.href = `recipe.html?id=${recipe.id}`;
  link.textContent = "View recipe";

  body.append(title, link);
  card.append(image, body);
  return card;
}

export function showRecipeCards(recipes, container) {
  container.replaceChildren(...recipes.map(createRecipeCard));
}