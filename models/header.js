const searchInput = document.getElementById("search-input");
const searchClose = document.getElementById("search-close");

searchInput.addEventListener("input", function () {
  if (searchInput.value) {
    searchClose.style.display = "block";
  } else {
    searchClose.style.display = "none";
  }
  searchBar();
});

searchClose.addEventListener("click", function () {
  searchInput.value = "";
  searchClose.style.display = "none";
  resetRecipes();
});

// Fonction de gestion de la position de l'image en background
function setContainerHeight() {
  const backgroundImage = document.querySelector(".background-img");
  const containerHeader = document.querySelector(".container-header");

  if (backgroundImage && containerHeader) {
    const imageHeight = backgroundImage.clientHeight;
    containerHeader.style.height = `${imageHeight}px`;
  }
}

document.addEventListener("DOMContentLoaded", setContainerHeight);
window.addEventListener("resize", setContainerHeight);
