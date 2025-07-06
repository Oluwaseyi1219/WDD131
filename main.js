import recipes from './recipes.mjs';

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getRandomListEntry(array) {
  return array[randomNumber(array.length)];
}

function tagsTemplate(tags) {
  return tags.map(tag => `<li>${tag}</li>`).join('');
}

function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += '<span aria-hidden="true" class="icon-star">⭐</span>';
    } else {
      html += '<span aria-hidden="true" class="icon-star-empty">☆</span>';
    }
  }
  html += '</span>';
  return html;
}

function recipeTemplate(recipe) {
  return `<figure class="recipe">
    <img src="${recipe.image}" alt="image of ${recipe.name}" />
    <figcaption>
      <ul class="recipe__tags">
        ${tagsTemplate(recipe.tags)}
      </ul>
      <h2><a href="#">${recipe.name}</a></h2>
      <p class="recipe__ratings">
        ${ratingTemplate(recipe.rating)}
      </p>
      <p class="recipe__description">
        ${recipe.description}
      </p>
    </figcaption>
  </figure>`;
}

function renderRecipes(recipeList) {
  const container = document.getElementById('recipes-container');
  if (!container) return;
  if (recipeList.length === 0) {
    container.innerHTML = '<p>No recipes found.</p>';
    return;
  }
  container.innerHTML = recipeList.map(recipeTemplate).join('');
}

function filterRecipes(query) {
  query = query.toLowerCase();
  return recipes.filter(recipe => {
    return (
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.tags.find(tag => tag.toLowerCase().includes(query)) ||
      recipe.ingredients.find(ing => ing.toLowerCase().includes(query))
    );
  }).sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(event) {
  event.preventDefault();
  const input = document.getElementById('search-input');
  const query = input.value.trim();
  const filtered = filterRecipes(query);
  renderRecipes(filtered);
}

function init() {
  const randomRecipe = getRandomListEntry(recipes);
  renderRecipes([randomRecipe]);
  const form = document.getElementById('search-form');
  if (form) {
    form.addEventListener('submit', searchHandler);
  }
}

init(); 