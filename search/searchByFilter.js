/* Fonction de gestion de la sélection ou désélection d'éléments en fonction du filtre */
function selectItem(selectedElement) {
  const filterValue = selectedElement.textContent.toLowerCase();
  // Si le filtre n'est pas présent
  if (!selectedFilters.some((filter) => filter.toLowerCase() === filterValue)) {
    // On ajoute le filtre au tableau et une recherche est effectuée
    selectedFilters.push(filterValue);
    searchByFilters(selectedFilters);
  } else {
    // Récupération de l'élément sélectionné cloné
    const selectedItemClone = document.querySelector(
      `.selected-item[data-filter="${filterValue}"]`
    );
    if (selectedItemClone) {
      // Appel de la fonction pour supprimer l'élément sélectionné
      removeSelectedItem(selectedElement, selectedItemClone);
      setTimeout(function () {
        // Timeout pour attendre la mise à jour du DOM avant de déclencher la nouvelle recherche avec les filtres mis à jour
        searchByFilters(selectedFilters);
      }, 0);
    }
  }
  // Appel de la fonction pour mettre à jour le visuel des éléments sélectionnés
  updateSelectedVisuals();
}

/* Fonction permettant d'ajuster le visuel lors de la sélection des éléments dans les filtres */
function updateSelectedItemLayout(selectedElement) {
  const filterValue = selectedElement.textContent.trim().toLowerCase();
  const svgDropdown = selectedElement.querySelector("svg");

  if (!selectedElement.classList.contains("selected")) {
    selectedElement.classList.add("selected");
    selectedElement.style.height = "37px";
    selectedElement.setAttribute("data-filter", filterValue);
    const existingClone = document.querySelector(
      `.selected-item[data-filter="${filterValue}"]`
    );
    // S'il n'existe pas de clone avec la même valeur de filtre
    if (!existingClone) {
      // Un p est crée
      selectedItemClone = document.createElement("p");
      selectedItemClone.textContent = filterValue;
      // On crée une classe
      selectedItemClone.classList.add("selected-item");
      selectedItemClone.setAttribute("data-filter", filterValue);
      selectedItemClone.onclick = function () {
        selectItem(this);
      };
      // Création d'un conteneur pour accueillir le clone
      selectedContainer.appendChild(selectedItemClone);
    }
  }
  // S'il n'y a pas d'élément svg
  if (!svgDropdown) {
    // On en créé un
    createDropdownSVG();
  }
  // S'il n'y a pas de clone svg
  if (!selectedItemClone.querySelector("svg")) {
    // Alors on en crée un
    createCloneSVG();
  }

  /* Création de l'UI dans les dropdowns */
  function createDropdownSVG() {
    const svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElement.setAttribute("width", "17");
    svgElement.setAttribute("height", "17");
    svgElement.setAttribute("viewBox", "0 0 17 17");

    const circleElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circleElement.setAttribute("cx", "8.5");
    circleElement.setAttribute("cy", "8.5");
    circleElement.setAttribute("r", "8.5");
    circleElement.setAttribute("fill", "black");

    const pathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement.setAttribute(
      "d",
      "M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11"
    );
    pathElement.setAttribute("stroke", "#FFD15B");
    pathElement.setAttribute("stroke-linecap", "round");
    pathElement.setAttribute("stroke-linejoin", "round");
    svgElement.appendChild(circleElement);
    svgElement.appendChild(pathElement);
    selectedElement.appendChild(svgElement);
  }
  // Création des clones svg
  function createCloneSVG() {
    if (!selectedItemClone) {
      console.error("selectedItemClone is undefined");
    }
    const svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElement.setAttribute("width", "14");
    svgElement.setAttribute("height", "13");
    svgElement.setAttribute("viewBox", "0 0 14 13");
    svgElement.setAttribute("fill", "none");
    const pathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement.setAttribute(
      "d",
      "M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5"
    );
    pathElement.setAttribute("stroke", "#1B1B1B");
    pathElement.setAttribute("stroke-width", "2.16667");
    pathElement.setAttribute("stroke-linecap", "round");
    pathElement.setAttribute("stroke-linejoin", "round");
    svgElement.appendChild(pathElement);
    selectedItemClone.appendChild(svgElement);
  }
}

/* Fonction de suppression des items sélectionnés */
function removeSelectedItem(selectedElement, selectedItemClone) {
  const filterValue = selectedElement.textContent.trim().toLowerCase();

  const index = selectedFilters.indexOf(filterValue);
  if (index !== -1) {
    // Utilisation de splice pour enlever l'élément
    selectedFilters.splice(index, 1);
  }
  if (selectedFilters.length === 0) {
    searchInput.value = "";
    resetPageState();
  }
  selectedElement.classList.remove("selected");
  selectedElement.style.height = "";
  selectedElement.querySelector("svg")?.remove();

  if (document.body.contains(selectedItemClone)) {
    setTimeout(function () {
      // Timeout pour attendre la mise à jour du DOM
      selectedItemClone.querySelector("svg")?.remove();
      selectedItemClone.remove();
    }, 0);
  }
}

/* Fonction de reset lorsque plus aucun élément n'est sélectionné */
function resetPageState() {
  updateDropdownOptions(1, allFilters, "ingredient");
  updateDropdownOptions(2, allFilters, "appliance");
  updateDropdownOptions(3, allFilters, "ustensil");

  // Mise à jour cartes et nombre de recettes
  fillCards(recipes);
  updateRecipeCount();
}

/* Fonction de mise à jour des items selectionnés */
function updateSelectedVisuals() {
  const containers = [
    dd1ListContainer,
    dd2ListContainer,
    dd3ListContainer,
    selectedContainer,
  ];

  // Vérification si les filtres et textes associés sont toujours valides en fonction du filtre sélectionné
  containers.forEach((container) => {
    const allSelectedItems = container.querySelectorAll('[class*="selected"]');

    allSelectedItems.forEach((selectedItem) => {
      const filterValue = selectedItem.getAttribute("data-filter");
      const selectedItemText = selectedItem.textContent.trim().toLowerCase();

      if (
        !selectedFilters.includes(filterValue) &&
        !selectedFilters.includes(selectedItemText)
      ) {
        // Suppression des éléments qui ne sont plus valides
        removeSelectedItem(selectedItem, null, null);
      }
    });
  });
}
