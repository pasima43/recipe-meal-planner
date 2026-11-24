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

function findNutrient(recipe, name) {
  const nutrients = recipe.nutrition?.nutrients ?? [];
  const match = nutrients.find((item) => item.name === name);
  return match ? `${Math.round(match.amount)} ${match.unit}` : "N/A";
}

export function createRecipeDetails(recipe) {
  const fragment = document.createDocumentFragment();

  const title = document.createElement("h1");
  title.textContent = recipe.title;

  const image = document.createElement("img");
  image.className = "recipe-details__image";
  image.src = recipe.image;
  image.alt = recipe.title;

  const info = document.createElement("p");
  info.textContent = `Ready in ${recipe.readyInMinutes} minutes | Serves ${recipe.servings}`;

  const ingredientsHeading = document.createElement("h2");
  ingredientsHeading.textContent = "Ingredients";
  const ingredientList = document.createElement("ul");
  recipe.extendedIngredients.forEach((ingredient) => {
    const item = document.createElement("li");
    item.textContent = ingredient.original;
    ingredientList.append(item);
  });

  const instructionsHeading = document.createElement("h2");
  instructionsHeading.textContent = "Instructions";
  const steps = recipe.analyzedInstructions?.[0]?.steps ?? [];
  let instructions;
  if (steps.length === 0) {
    instructions = document.createElement("p");
    instructions.textContent = "No instructions available for this recipe.";
  } else {
    instructions = document.createElement("ol");
    steps.forEach((step) => {
      const item = document.createElement("li");
      item.textContent = step.step;
      instructions.append(item);
    });
  }

  const nutritionHeading = document.createElement("h2");
  nutritionHeading.textContent = "Nutrition (per serving)";
  const nutritionList = document.createElement("ul");
  [
    ["Calories", "Calories"],
    ["Protein", "Protein"],
    ["Carbs", "Carbohydrates"],
    ["Fat", "Fat"],
  ].forEach(([label, apiName]) => {
    const item = document.createElement("li");
    item.textContent = `${label}: ${findNutrient(recipe, apiName)}`;
    nutritionList.append(item);
  });

  fragment.append(
    title,
    image,
    info,
    ingredientsHeading,
    ingredientList,
    instructionsHeading,
    instructions,
    nutritionHeading,
    nutritionList,
  );
  return fragment;
}