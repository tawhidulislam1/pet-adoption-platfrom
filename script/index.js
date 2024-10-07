const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories))
    .catch((error) => console.log(error));
};
const displayCategory = (category) => {
  // console.log(category);
  const categoryContainer = document.getElementById("categoryContainer");
  category.forEach((item) => {
    console.log(item);
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
     <button id="" onclick="" class="tab py-5 category-btn flex gap-5 border-blue-700">
    <img class="w-10" src= ${item.category_icon}> <span class="font-semibold font-xl">${item.category}<span> </button>
  `;
    categoryContainer.append(buttonContainer);
  });
};
loadCategory();
