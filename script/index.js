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
     <button id="id-${item.category}" onclick="loadCategoryPet('${item.category}')" class="tab reloder category-btn flex-nowrap p-10 flex gap-5 border-blue-700 category-btn">
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
        <p><i class="fas fa-ellipsis-v"></i><i class="fas fa-ellipsis-v"></i><i class="fas fa-ellipsis-v"></i> 
        ${`
         Breed: ${item.breed ? item.breed : "not available "}
          `}</p>
        <p><i class="fas fa-birthday-cake"></i> ${`
           Birth: ${item.date_of_birth ? item.date_of_birth : "not available "}
            `}</p>
        <p><i class="fas fa-mercury"></i>
        ${`
          Gender: ${item.gender ? item.gender : "not available "}
           `} 
      </p>
        <p><i class="fas fa-dollar-sign"></i> 
        ${`
          Price: ${item.price ? item.price : "not available "}
           `} </p>
        <div class="card-actions grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <button class="btn btn-sm p-2" onclick="likePetCardImage('${
          item.image
        }')"><img src="https://img.icons8.com/?size=50&id=24816&format=png" class="w-5"> </button>
        <button class="btn btn-sm" onclick="adoptBtn(${item.petId})"  id="id-${
      item.petId
    }">Adopt</button>
        <button class="btn btn-sm" onclick="loadPetDetails('${
          item.petId
        }')">Details</button>
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

// selecting loading div
const loader = document.querySelector("#loading");

// all pet categories wise load
const loadCategoryPet = (category_name) => {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.remove("btn-borders");
  loader.classList.add("display");
  const petCard = document.getElementById("post-card");
  petCard.innerHTML = `
  <div id=""> </div>
  <div id="loading"> </div>
  <div id=""> </div>
  `;

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
    })
    .catch((error) => console.log(error));
  setTimeout(() => {
    loader.classList.remove("display");
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
        displayPetCard(data.data);
      })
      .catch((error) => console.log(error));
  }, 1000);
};

// like pet image

const likePetCardImage = (img) => {
  const likedImageContaner = document.getElementById("add-card");
  const div = document.createElement("div");
  div.classList = "w-full h-20";
  div.innerHTML = `
      <img src='${img}' class="h-20" />   
    `;
  likedImageContaner.append(div);
};

// show per card details usgin modal

// loadCategory Details
const loadPetDetails = async (pet_id) => {
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${pet_id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPetDetails(data.petData);
};
const displayPetDetails = (data) => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
<figure>
  <img src=${data.image}  class="w-10/12 mx-auto"/>
</figure>
 <div class="card-body p-4">
        <h2 class="card-title font-extrabold">${data.pet_name}</h2>
        <div class="flex justify-between items-center">
          <div>
            <p><i class="fas fa-ellipsis-v"></i><i class="fas fa-ellipsis-v"></i><i class="fas fa-ellipsis-v"></i> Breed: ${data.breed}</p>
            <p><i class="fas fa-birthday-cake"></i> Birth: ${data.date_of_birth}</p>
            
            <p><i class="fas fa-venus"></i> Vaccinated Status: ${data.vaccinated_status}</p>
          </div>
          <div>
            <p><i class="fas fa-dollar-sign"></i>  Price: ${data.price}$</p>
            <p><i class="fas fa-mercury"></i> Gender: ${data.gender}</p>
          </div>
           
        </div>
            <div class="divider"></div>
            <div>
              <h4 class="font-bold text-xl">Details Information:</h4>
              <p> ${data.pet_details}</p>            
            </div>
        </div>
      </div>
`;
  document.getElementById("custom").showModal();
};
const adoptBtn = (petId) => {
  const adoptContainer = document.getElementById("adopt-container");

  adoptContainer.innerHTML = `
     <div class="card-body p-4 flex flex-nowrap items-center">
          <img src="https://img.icons8.com/?size=100&id=qhdkUpp0zLSB&format=png&color=000000" class="w-10">
          <h3 class="text-3xl font-bold">Congrats</h3>
          <h3 class="text-xl font-semibold">Adoption process has started for your pet</h3>
          <h3 class="text-xl font-semibold" id="countdown">3</h3>
      </div>
  `;

  let num = 3;
  const countdownElement = document.getElementById("countdown");

  const clockId = setInterval(() => {
    num = num - 1;
    countdownElement.textContent = `${num}`;
    if (num <= 0) {
      clearInterval(clockId);
    }
    if (num === 0) {
      document.getElementById("adopt").close();
    }
  }, 1000);
  const disabled = document.getElementById(`id-${petId}`);
  disabled.innerText = "adopted";
  disabled.setAttribute("disabled", "");
  document.getElementById("adopt").showModal();
};

const SortPrice = (cards) => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      const products = data.pets;
      let sortedProducts = products.sort((p1, p2) =>
        p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0
      );
      displayPetCard(sortedProducts);
    })

    .catch((error) => console.log(error));
};

loadPetCard();
loadCategory();
