/* Application de la methode reduce() */

// Recherche de départ ou l'on sélectionne toutes les recettes
const allAppliances = recipes.reduce((appliances, recipe) => {
  if (!appliances.includes(recipe.appliance.toLowerCase())) {
    appliances.push(recipe.appliance.toLowerCase());
  }
  // On retourne tous les appareils
  return appliances;
}, []);

// Fonction qui réduit la liste des appareils et ressort dans un tableau les appareils filtrés
function getUniqueAppliances(results) {
  const uniqueAppliances = results.reduce((appliances, recipe) => {
    if (!appliances.includes(recipe.appliance.toLowerCase())) {
      appliances.push(recipe.appliance.toLowerCase());
    }
    return appliances;
  }, []);
  return uniqueAppliances;
}

const dd2ListContainer = document.querySelector(".dd2-list");
dd2ListContainer.innerHTML = "";

// Si aucun élément n'est selectionné
if (selectedContainer.children.length === 0 && results.length === 0) {
  // Alors on fait apparaitre tous les appareils
  allAppliances.forEach((appliance) => {
    const pElement = document.createElement("p");
    pElement.textContent = appliance;
    pElement.onclick = function () {
      selectItem(this);
    };
    dd2ListContainer.appendChild(pElement);
  });
  // Sinon on lance la liste unique d'appareils
} else {
  const uniqueAppliances = getUniqueAppliances(results);
  uniqueAppliances.forEach((appliance) => {
    const pElement = document.createElement("p");
    pElement.textContent = appliance;
    pElement.onclick = function () {
      selectItem(this);
    };
    dd2ListContainer.appendChild(pElement);
  });
}
