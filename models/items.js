const dd1ListContainer = document.querySelector(".dd1-list");
const dd2ListContainer = document.querySelector(".dd2-list");
const dd3ListContainer = document.querySelector(".dd3-list");

const ddListContainers = {
  ingredients: document.querySelector(".dd1-list"),
  appliances: document.querySelector(".dd2-list"),
  ustensils: document.querySelector(".dd3-list"),
};

// Recherche de départ où l'on sélectionne toutes les recettes

const allFilters = recipes.reduce(
  (filters, recipe) => {
    // Ajouter les appareils uniques
    recipe.appliance.toLowerCase();
    if (!filters.appliances.includes(recipe.appliance.toLowerCase())) {
      filters.appliances.push(recipe.appliance.toLowerCase());
    }
    // Ajouter les ingrédients uniques
    recipe.ingredients.forEach((ingredient) => {
      if (!filters.ingredients.includes(ingredient.ingredient.toLowerCase())) {
        filters.ingredients.push(ingredient.ingredient.toLowerCase());
      }
    });
    // Ajouter les ustensiles uniques
    recipe.ustensils.forEach((ustensil) => {
      const lowerCaseUstensil = ustensil.toLowerCase();
      if (!filters.ustensils.includes(lowerCaseUstensil)) {
        filters.ustensils.push(lowerCaseUstensil);
      }
    });
    return filters;
  },
  { appliances: [], ingredients: [], ustensils: [] }
);

// Fonction qui réduit la liste des filtres et ressort un tableau des filtres uniques
function getUniqueFilters(results, filterType) {
  const uniqueFilters = results.reduce((filters, recipe) => {
    switch (filterType) {
      case "appliances":
        if (!filters.includes(recipe.appliance.toLowerCase())) {
          filters.push(recipe.appliance.toLowerCase());
        }
        break;
      case "ingredients":
        recipe.ingredients.forEach((ingredient) => {
          const existingIngredient = filters.find(
            (filter) => filter === ingredient.ingredient.toLowerCase()
          );
          if (!existingIngredient) {
            filters.push(ingredient.ingredient.toLowerCase());
          }
        });
        break;
      case "ustensils":
        recipe.ustensils.forEach((ustensil) => {
          const lowerCaseUstensil = ustensil.toLowerCase();
          if (!filters.includes(lowerCaseUstensil)) {
            filters.push(lowerCaseUstensil);
          }
        });
        break;
      default:
        break;
    }
    return filters;
  }, []);
  return uniqueFilters;
}

const selectedContainer = document.getElementById("selectedContainer");

// Si aucun élément n'est sélectionné
if (selectedContainer.children.length === 0) {
  // Alors on fait apparaître tous les filtres pour chaque type
  Object.keys(ddListContainers).forEach((filterType) => {
    const allFiltersOfType = allFilters[filterType];
    allFiltersOfType.forEach((filter) => {
      const pElement = document.createElement("p");
      pElement.textContent = filter;
      pElement.onclick = function () {
        selectItem(this);
      };
      ddListContainers[filterType].appendChild(pElement);
    });
  });
} else {
  // Ou la liste unique de filtres basée sur les résultats
  Object.keys(ddListContainers).forEach((filterType) => {
    const uniqueFilters = getUniqueFilters(results, filterType);
    uniqueFilters.forEach((filter) => {
      const pElement = document.createElement("p");
      pElement.textContent = filter;
      pElement.onclick = function () {
        selectItem(this);
      };
      ddListContainers[filterType].appendChild(pElement);
    });
  });
}
