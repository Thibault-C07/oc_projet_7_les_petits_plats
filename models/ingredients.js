/* Application de la methode reduce() */

// On selectionne toutes les recettes
const allIngredients = recipes.reduce((ingredients, recipe) => {
  recipe.ingredients.forEach((ingredient) => {
    if (
      !ingredients.some(
        (i) =>
          i.ingredient.toLowerCase() === ingredient.ingredient.toLowerCase()
      )
    ) {
      ingredients.push({
        ingredient: ingredient.ingredient.toLowerCase(),
      });
    }
  });
  // On retourne tous les ingrédients
  return ingredients;
}, []);

// Fonction qui réduit la liste des ingrédients et ressort dans un tableau les ingrédients filtrés
function getUniqueIngredients(results) {
  const uniqueIngredients = results.reduce((ingredients, recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const existingIngredient = ingredients.find(
        (i) => i.toLowerCase() === ingredient.ingredient.toLowerCase()
      );
      if (!existingIngredient) {
        ingredients.push(ingredient.ingredient.toLowerCase());
      }
    });
    return ingredients;
  }, []);
  return uniqueIngredients;
}

const dd1ListContainer = document.querySelector(".dd1-list");
const selectedContainer = document.getElementById("selectedContainer");

dd1ListContainer.innerHTML = "";
// Si aucun élément n'est selectionné

if (selectedContainer.children.length === 0 && results.length === 0) {
  // Alors on fait apparaitre tous les ingrédients
  allIngredients.forEach((ingredient) => {
    const pElement = document.createElement("p");
    pElement.textContent = ingredient.ingredient;
    pElement.onclick = function () {
      selectItem(this);
    };
    dd1ListContainer.appendChild(pElement);
  });
  // Ou la liste unique d'ingrédients
} else {
  const uniqueIngredients = getUniqueIngredients(results);
  uniqueIngredients.forEach((ingredient) => {
    const pElement = document.createElement("p");
    pElement.textContent = ingredient.ingredient;
    pElement.onclick = function () {
      selectItem(this);
    };
    dd1ListContainer.appendChild(pElement);
  });
}
