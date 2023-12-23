const allAppliances = recipes.reduce((appliances, recipe) => {
  if (!appliances.includes(recipe.appliance.toLowerCase())) {
    appliances.push(recipe.appliance.toLowerCase());
  }
  return appliances;
}, []);

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

if (selectedContainer.children.length === 0) {
  allAppliances.forEach((appliance) => {
    const pElement = document.createElement("p");
    pElement.textContent = appliance;
    pElement.onclick = function () {
      selectItem(this);
    };
    dd2ListContainer.appendChild(pElement);
  });
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
