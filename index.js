function activeBtn(id, category){
  let allButton = document.getElementsByClassName('caregoryBtn');
  
  for (let button of allButton) {
      button.classList.remove('active');
      button.classList.add('not-active');
  }

  let button = document.getElementById(id);
  button.classList.remove('not-active');
  button.classList.add('active');

  const container = document.getElementById('categories');
  container.innerHTML = `
    <div id="loading" class="w-2/12 my-6 mx-auto">
      <img class="w-full" src="./images/Spinner.gif" alt="Loading spinner">
    </div>
  `;

  document.getElementById('loading').style.display = 'block';

  setTimeout(()=>{
     renderByCategory(category);
  }, 700);
};

function openModal(id){
  const modal = document.getElementById("modal");
  const countDisplay = document.getElementById("countDisplay");
  let count = 3;

  modal.style.display = "block";

  const interval = setInterval(() =>{
      countDisplay.innerText = count;
      count--;
      if (count < 0) {
          clearInterval(interval);
          modal.style.display = "none";
      }
  }, 750);
  countDisplay.innerText = 3
  let btn = document.getElementById(id);
  btn.innerText = 'Adopted';
  btn.setAttribute('disabled', '');
  btn.classList = "pointer-events-none opacity-50 bg-white border-2 border-slate-200 rounded-xl py-2 px-1 text-1xl";
};

async function renderByCategory(category) {
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
  const data = await response.json();
  const arr = data.data;
  
  const div = document.createElement('div');
  div.classList = "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5";

  if(arr.length > 0){
    arr.forEach((obj)=>{
      div.innerHTML += `
        <div class="md:w-64 w-full p-5 rounded-lg overflow-hidden border-2 border-slate-100">
          <div>
            <img class="rounded-xl w-full h-auto block object-cover" src="${obj.image}" alt="${obj.pet_name}">
          </div>
          <div class="flex flex-col gap-3 items-start mt-3 mb-4">
            <p class="text-xl font-bold">${obj.pet_name}</p>
            <p class="flex items-center gap-2 text-base opacity-70">
              <i class="fa-solid fa-border-all"></i>
              Breed: ${obj.breed ? obj.breed : 'N/A'}
            </p>
            <p class="flex items-center gap-2 text-base opacity-70">
              <i class="fa-solid fa-cake-candles"></i>
              Birth: ${obj.date_of_birth ? obj.date_of_birth : 'N/A'}
            </p>
            <p class="flex items-center gap-2 text-base opacity-70">
              <i class="fa-solid fa-venus"></i>
              Gender: ${obj.gender ? obj.gender : 'N/A'}
            </p>
            <p class="flex items-center gap-2 text-base opacity-70">
              <i class="fa-solid fa-dollar-sign"></i>
              Price: $${obj.price ? obj.price : 'N/A'}
            </p>
          </div>
          <hr/>
          <div class="flex justify-between items-center mt-5">
            <button class="bg-white border-2 border-slate-200 rounded-xl py-1 px-3 text-2xl" onclick='renderImg("${obj.image}")'> <i class="fa-regular fa-thumbs-up"></i> </button>
            <button class="bg-white border-2 border-slate-200 rounded-xl py-2 px-3 text-1xl" id="${obj.petId}12" onclick="openModal('${obj.petId}12')"> Adopt </button>
            <button class="bg-white border-2 border-slate-200 rounded-xl py-2 px-3 text-1xl" id="openModalBtn" onclick='showDetails("${obj.petId}")'> Details </button>
          </div>
        </div>
        `;
      });
  } else {
      div.classList.remove("grid");
      div.innerHTML = `
      <div class="flex flex-col justify-center items-center p-20 border border-slate-100 rounded-xl bg-[#1f1e1e08]">
        <img src="./images/error.webp"/>
        <h2 class="text-3xl font-bold text-center"> No Information Available </h2>
        <p class="text-base opacity-70 text-center"> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a. </p>
      </div>
      `;
      console.log('No Data Available');
  }

  const container = document.getElementById('categories');
  container.innerHTML = '';
  container.appendChild(div);

  const aside = document.getElementById('aside');
  if(!aside){
    const newAside = document.createElement('div');
    container.appendChild(newAside);
  }
};

function renderImg(img) {
  const aside = document.getElementById('aside');
  aside.innerHTML += `
    <img class="w-full h-auto rounded-xl" src="${img}" alt="Liked image">
  `;
};

async function showDetails(id){
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
  const data = await response.json();
  const petData = data.petData;

  const modal = document.createElement('div');
  modal.classList = "hidden fixed z-10 left-0 top-0 w-full h-full justify-center items-center bg-white bg-opacity-55 overflow-x-hidden";
  modal.innerHTML = `
    <div class="bg-white p-5 rounded-3 md:w-2/4 w-full text-center overflow-x-hidden">
      <img class=" rounded-xl w-full" src="${petData.image}">
      <div class="p-5 text-left">
        <h2 class="font-2xl mb-3 text-black font-bold">${petData.pet_name}</h2>
        <div class="grid grid-cols-2 mb-5 p-0 m-0">
          <p class="text-base opacity-80 flex items-center gap-1"><i class="fa-solid fa-border-all"></i> Breed: ${petData.breed ? petData.breed : 'N/A'}</p>
          <p class="text-base opacity-80 flex items-center gap-1"><i class="fa-solid fa-venus"></i> Gender: ${petData.gender ? petData.gender : 'N/A'}</p>
          <p class="text-base opacity-80 flex items-center gap-1"><i class="fa-solid fa-cake-candles"></i> Birth: ${petData.date_of_birth ? petData.date_of_birth : 'N/A'}</p>
          <p class="text-base opacity-80 flex items-center gap-1"><i class="fa-solid fa-dollar-sign"></i> Price: $${petData.price ? petData.price : 'N/A'}</p>
          <p class="text-base opacity-80 flex items-center gap-1"><i class="fa-solid fa-dollar-sign"></i> Vaccinated: ${petData.vaccinated_status ? petData.vaccinated_status : 'N/A'}</p>
        </div>
        <hr class="mb-5">
        <div class="mb-5">
          <h3 class="text-xl mb-3 text-[#333]">Details Information:</h3>
          <p class="text-base opacity-80">${petData.pet_details}</p>
        </div>
        <button class="close  bg-[#e0f7fa] text-[#00796b] p-3 rounded-md w-full cursor-pointer transition-colors text-xl border border-cyan-600"> Cancel </button>
      </div>
      </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.close');
  closeBtn.addEventListener('click', ()=>{
      modal.style.display = 'none';
  });


  window.addEventListener('click', (event)=>{
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });

  modal.style.display = 'flex';
};

async function sortByPrice(){
  const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
  const data = await response.json();
  const pets = data.pets;

  pets.sort((a, b)=>{
    const priceA = a.price ? parseFloat(a.price) : 0;
    const priceB = b.price ? parseFloat(b.price) : 0;
    return priceB - priceA;
  });

  const existingPetsDiv = document.getElementById('categories');
  if(existingPetsDiv){
    existingPetsDiv.remove();
  }

  const container = document.getElementById('sub-main-section');
  container.classList.add =" ";
  const div = document.createElement('div');
  div.classList = "lg:w-3/4 md:w-2/3 w-full grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5";

  pets.forEach((obj)=>{
    div.innerHTML += `
      <div class="md:w-64 w-ful p-5 rounded-lg overflow-hidden border-2 border-slate-100">
        <div>
          <img class="rounded-xl w-full h-auto block object-cover" src="${obj.image}" alt="${obj.pet_name}">
        </div>
        <div class="flex flex-col gap-3 items-start mt-3 mb-4">
          <p class="text-xl font-bold">${obj.pet_name}</p>
          <p class="flex items-center gap-2 text-base opacity-70"> <i class="fa-solid fa-border-all"></i> Breed: ${obj.breed ? obj.breed : 'N/A'} </p>
          <p class="flex items-center gap-2 text-base opacity-70"> <i class="fa-solid fa-cake-candles"></i> Birth: ${obj.date_of_birth ? obj.date_of_birth : 'N/A'} </p>
          <p class="flex items-center gap-2 text-base opacity-70"> <i class="fa-solid fa-venus"></i> Gender: ${obj.gender ? obj.gender : 'N/A'} </p>
          <p class="flex items-center gap-2 text-base opacity-70"> <i class="fa-solid fa-dollar-sign"></i> Price: $${obj.price ? obj.price : 'N/A'} </p>
        </div>
        <hr/>
        <div class="flex justify-between items-center mt-5">
          <button class="bg-white border-2 border-slate-200 rounded-xl py-1 px-3 text-2xl" onclick='renderImg("${obj.image}")'> <i class="fa-regular fa-thumbs-up"></i> </button>
          <button class="bg-white border-2 border-slate-200 rounded-xl py-2 px-3 text-1xl" id="${obj.petId}12" onclick="openModal('${obj.petId}12')"> Adopt </button>
          <button class="bg-white border-2 border-slate-200 rounded-xl py-2 px-3 text-1xl" id="openModalBtn" onclick='showDetails("${obj.petId}")'> Details </button>
        </div>
      </div>
    `;
  });

  container.prepend(div);
};

const renderCategoryButton = async()=>{
  const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
  const data = await response.json();
  const arr = data.categories;
  const categoryDiv = document.getElementById('category-option')
  const div = document.createElement('div')
  div.classList = "flex md:justify-between justify-center mt-5 items-center flex-wrap gap-3"
  arr.forEach((obj)=>{
    div.innerHTML += `
    <button id='${obj.id}' class='caregoryBtn w-52 h-16 bg-transparent text-lg px-3 py-5 border rounded-xl flex gap-3 items-center justify-center font-bold transition-all hover:bg[#becfeb] hover:cursor-pointer' onclick='activeBtn("${obj.id}", "${obj.category}")'>
      <img class="w-10 h-10" src="${obj.category_icon}" alt="pet picture">${obj.category}
    </button>
    `;
  });
  categoryDiv.appendChild(div)
};

const renderAll = async()=>{
  const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
  const data = await response.json()
  const dataArr = data.pets

  const container = document.getElementById('categories');
  container.classList ="lg:w-3/4 md:w-2/3 w-full ";
  const div = document.createElement('div');
  div.classList = "grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5"

  dataArr.forEach((obj)=>{
    div.innerHTML += `
      <div class="md:w-64 w-ful p-5 rounded-lg overflow-hidden border-2 border-slate-100">
        <div>
          <img class="rounded-xl w-full h-auto block object-cover" src="${obj.image}" alt="${obj.pet_name}">
        </div>
        <div class="flex flex-col gap-3 items-start mt-3 mb-4">
          <p class="text-xl font-bold">${obj.pet_name}</p>
          <p class="flex items-center gap-2 text-base opacity-70"> <i class="fa-solid fa-border-all"></i> Breed: ${obj.breed ? obj.breed : 'N/A'} </p>
          <p class="flex items-center gap-2 text-base opacity-70"> <i class="fa-solid fa-cake-candles"></i> Birth: ${obj.date_of_birth ? obj.date_of_birth : 'N/A'} </p>
          <p class="flex items-center gap-2 text-base opacity-70"> <i class="fa-solid fa-venus"></i> Gender: ${obj.gender ? obj.gender : 'N/A'} </p>
          <p class="flex items-center gap-2 text-base opacity-70"> <i class="fa-solid fa-dollar-sign"></i> Price: $${obj.price ? obj.price : 'N/A'} </p>
        </div>
        <hr/>
        <div class="flex justify-between items-center mt-5">
          <button class="bg-white border-2 border-slate-200 rounded-xl py-1 px-3 text-2xl" onclick='renderImg("${obj.image}")'> <i class="fa-regular fa-thumbs-up"></i> </button>
          <button class="bg-white border-2 border-slate-200 rounded-xl py-2 px-3 text-1xl" id="${obj.petId}12" onclick="openModal('${obj.petId}12')"> Adopt </button>
          <button class="bg-white border-2 border-slate-200 rounded-xl py-2 px-3 text-1xl" id="openModalBtn" onclick='showDetails("${obj.petId}")'> Details </button>
        </div>
      </div>
    `;
  });
  container.prepend(div);
};

renderCategoryButton();
renderAll();
