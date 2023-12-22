searchInput.addEventListener("input", function () {
  searchBar();
});

/* Fonction de recherche avec la méthode filter() */
function searchBar() {
  // Utilisation de toLowerCase pour la recherche avec majuscule
  const userInput = searchInput.value.toLowerCase();
  // Si moins de 3 caractères
  if (userInput.length >= 3) {
    selectedFilters = [];
    results = recipes.filter((recipe) => {
      const titleMatch = recipe.name.toLowerCase().includes(userInput);
      const ingredientsMatch = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(userInput)
      );
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(userInput);
      return titleMatch || ingredientsMatch || descriptionMatch;
    });
    updateSearchResults(results);
    fillCards(results);
  } else {
    resetRecipes();
  }
}

// Fonction avec boucle for pour rechercher dans les filtres
function searchByFilters(selectedFilters) {
  let results = [];
  for (const recipe of recipes) {
    let filterMatch = true;
    for (const filter of selectedFilters) {
      // Recherche d'un ingrédient, appareil ou ustensile correspondant
      if (
        !(
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(filter.toLowerCase())
          ) ||
          recipe.appliance.toLowerCase().includes(filter.toLowerCase()) ||
          recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(filter.toLowerCase())
          )
        )
        // S'il n'y a pas match on break
      ) {
        filterMatch = false;
        break;
      }
    }
    // S'il y a match on push la recette dans le résultat
    if (filterMatch) {
      results.push(recipe);
    }
  }
  // On met à jour le résultat et on affiche la carte associée
  updateSearchResults(results);
  fillCards(results);
}

/* Fonction de mise à jour des résultats et des dropdowns en fonction des filtres sélectionnés */
function updateSearchResults(results) {
  // Appel des 3 fonctions pour extraire les différentes listes à partir des résultats de recherche
  const uniqueIngredients = getUniqueIngredients(results);
  const uniqueAppliances = getUniqueAppliances(results);
  const uniqueUstensils = getUniqueUstensils(results);

  // Mise à jour des dropdowns
  updateDropdownOptions(1, uniqueIngredients, "ingredient");
  updateDropdownOptions(2, uniqueAppliances, "appliance");
  updateDropdownOptions(3, uniqueUstensils, "ustensil");

  const containers = [dd1ListContainer, dd2ListContainer, dd3ListContainer];

  selectedFilters.forEach((filter) => {
    const isInIngredients = uniqueIngredients.includes(filter);
    const isInAppliances = uniqueAppliances.includes(filter);
    const isInUstensils = uniqueUstensils.includes(filter);
    // Check pour chaque filtre si les différents éléments sont présents (ingrédients, appareils et ustensiles)
    if (isInIngredients || isInAppliances || isInUstensils) {
      const dropdownElement = findDropdownElementByText(filter, containers);
      if (dropdownElement) {
        // Mise à jour des la mise en page des éléments
        updateSelectedItemLayout(dropdownElement);
      }
    }
  });
}

/* Fonctionne de recherche par texte à l'intérieur des dropdowns */
function findDropdownElementByText(text, containers) {
  for (const container of containers) {
    // Sélection des éléments p des conteneurs des dropdowns
    const allDropdownElements = container.querySelectorAll("p");

    for (const element of allDropdownElements) {
      // Check de l'élément tapé dans la barre de recherche
      if (
        element.textContent.trim().toLowerCase() === text.trim().toLowerCase()
      ) {
        // Renvoie de l'élément
        return element;
      }
    }
  }
  // Renvoie null s'il n'y a rien
  return null;
}

/* Reset des recettes */
function resetRecipes() {
  fillCards(recipes);
  updateRecipeCount();
}

/* Fonction de mise à jour du contenu des dropdowns avec les options générées (texte ou objets) */
function updateDropdownOptions(dropdownNumber, options, property) {
  // Choix du dropdown (1, 2 et 3)
  const dropdownId = `dd${dropdownNumber}-list`;
  const dropdown = document.getElementById(dropdownId);
  // Si le dropdown n'est pas trouvé alors message d'erreur
  if (!dropdown) {
    console.error(`Dropdown with ID ${dropdownId} not found.`);
    return;
  }
  // Effacement du du contenu existant
  dropdown.innerHTML = "";

  options.forEach((option) => {
    const optionElement = document.createElement("p");
    // Check du type d'option
    if (typeof option === "string") {
      optionElement.textContent = option.toLowerCase();
    } else if (typeof option === "object" && property in option) {
      optionElement.textContent = option[property].toLowerCase();
    } else {
      console.error(`Invalid option format: ${option}`);
      return;
    }
    // Evenement au click sur l'option
    optionElement.onclick = function () {
      selectItem(this);
    };
    // Ajout de l'élement dans le dropdown
    dropdown.appendChild(optionElement);
  });
}
