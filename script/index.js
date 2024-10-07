// all pet category load
const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories))
    .catch((error) => console.log(error));
};
// all pet category display
const displayCategory = (category) => {
  const categoryContainer = document.getElementById("categoryContainer");
  category.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList = "btn-borders";
    buttonContainer.innerHTML = `
     <button id="id-${item.category}" onclick="loadCategoryPet('${item.category}')" class="tab category-btn flex-nowrap p-10 flex gap-5 border-blue-700 category-btn">
    <img class="w-10" src= ${item.category_icon}> <span class="font-semibold font-xl">${item.category}</span> </button>
  `;
    categoryContainer.append(buttonContainer);
  });
};
// all pet card load
const loadPetCard = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPetCard(data.pets))
    .catch((error) => console.log(error));
};

// all pet card display
const displayPetCard = (cards) => {
  const petCard = document.getElementById("post-card");
  petCard.innerHTML = "";
  if (cards.length === 0) {
    petCard.classList.remove("grid");
    petCard.innerHTML = `
      <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
          <img src="images/error.webp">
          <h2 class="text-2xl text-bold">No Information Available</h2>      
          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
      </div>  
    `;
  } else {
    petCard.classList.add("grid");
  }
  cards.forEach((item) => {
    const div = document.createElement("div");
    div.classList = "card card-compact";

    div.innerHTML = `
      <figure>
        <img 
          src=${item.image}
          alt="Shoes" class="w-full h-30"/>
      </figure>
      <div class="card-body">
        <h2 class="card-title">${item.pet_name}</h2>
        <p>Breed: ${item.breed}</p>
        <p>Birth: ${item.date_of_birth}</p>
        <p>Gender: ${item.gender}</p>
        <p>Price: ${item.price}$</p>
        <div class="card-actions grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <button class="btn btn-sm p-2"><img src="https://img.icons8.com/?size=50&id=24816&format=png" class="w-5"> </button>
        <button class="btn btn-sm">Adopt</button>
        <button class="btn btn-sm">Details</button>
        </div>
      </div>
    `;

    petCard.append(div);
  });
};
const removeActive = () => {
  const removeActives = document.getElementsByClassName("category-btn");
  for (let btn of removeActives) {
    btn.classList.remove("active");
  }
};
// all pet categories wise load
const loadCategoryPet = (category_name) => {
  fetch(
    ` https://openapi.programming-hero.com/api/peddy/category/${category_name}`
  )
    .then((res) => res.json())
    .then((data) => {
       //remove all button color
       removeActive();
       // add acitve btn color
       const buttons = document.getElementById(`id-${category_name}`);
       buttons.classList.add("active");
      displayPetCard(data.data)
    })
    .catch((error) => console.log(error));
};
loadPetCard();
loadCategory();
