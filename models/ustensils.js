/* Application de la methode reduce() */

// On selectionne toutes les recettes
const allUstensils = recipes.reduce((ustensils, recipe) => {
  recipe.ustensils.forEach((ustensil) => {
    const lowerCaseUstensil = ustensil.toLowerCase();
    if (!ustensils.includes(lowerCaseUstensil)) {
      ustensils.push(lowerCaseUstensil);
    }
  });
  // On retourne tous les ustensiles
  return ustensils;
}, []);

// Fonction qui réduit la liste des ustensiles et ressort dans un tableau les ustensiles filtrés
function getUniqueUstensils(results) {
  const uniqueUstensils = results.reduce((ustensils, recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      const lowerCaseUstensil = ustensil.toLowerCase();
      if (!ustensils.includes(lowerCaseUstensil)) {
        ustensils.push(lowerCaseUstensil);
      }
    });
    return ustensils;
  }, []);
  return uniqueUstensils;
}

const dd3ListContainer = document.querySelector(".dd3-list");
dd3ListContainer.innerHTML = "";
// Si aucun élément n'est selectionné
if (selectedContainer.children.length === 0 && results.length === 0) {
  // Alors on fait apparaitre tous les ustensiles
  allUstensils.forEach((ustensil) => {
    const pElement = document.createElement("p");
    pElement.textContent = ustensil;
    pElement.onclick = function () {
      selectItem(this);
    };
    dd3ListContainer.appendChild(pElement);
  });
  // Ou la liste unique d'ustensiles
} else {
  const uniqueUstensils = getUniqueUstensils(results);
  uniqueUstensils.forEach((ustensil) => {
    const pElement = document.createElement("p");
    pElement.textContent = ustensil;
    pElement.onclick = function () {
      selectItem(this);
    };
    dd3ListContainer.appendChild(pElement);
  });
}
