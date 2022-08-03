const horsesContainer = document.querySelector("#freehorses");
const form = document.querySelector("#newHorse");
const baseURL = `http://localhost:4004/api/map.html`;
function displayHorses(arr) {
  horsesContainer.innerHTML = ``;
  for (let i = 0; i < arr.length; i++) {
    makeHorseCard(arr[i]);
  }
}
const horsesCallback = ({ data: horses }) => displayHorses(horses);
const errCallback = (err) => console.log(err);
const getAllHorses = () => {
  horsecardnum = 0;
  axios.get(baseURL).then(horsesCallback).catch(errCallback);
};
const createHorse = (body) => {
  axios.post(baseURL, body).then(horsesCallback).catch(errCallback);
  getAllHorses();
};
function submitHandler(e) {
  e.preventDefault();
  let name = document.querySelector("#name");
  let barnname = document.querySelector("#barnname");
  let owner = document.querySelector("#owner");
  let age = document.querySelector("#age");
  let imageURL = document.querySelector("#img");

  let bodyObj = {
    name: name.value,
    barnname: barnname.value,
    owner: owner.value,
    age: age.value,
    imageURL: imageURL.value,
  };

  createHorse(bodyObj);

  name.value = "";
  barnname.value = "";
  owner.value = "";
  age.value = "";
  imageURL.value = "";
}
const makeHorseCard = (horse) => {
  const horseCard = document.createElement("div");
  horseCard.classList.add("horse-card");
  horseCard.setAttribute("draggable", true);
  horseCard.setAttribute("id", `${horse.horse_id}`);
  horseCard.innerHTML = `<img alt='horse cover image' src=${horse.imageurl} class="horse-cover-image" draggable = 'false'/>
    <div class = 'horse-info'>
        <p class="horse-name">${horse.name}</p>
        <p class="horse-barnname">Barn Name: ${horse.barnname}</p>
        <p class="horse-owner">Owner: ${horse.owner}</p>
        <p class="horse-age">Age: ${horse.age}</p>
    </div>
    `;
    console.log(document.querySelector(`#stall${horse.position}`))

 if(document.querySelector(`#stall${horse.position}`)!==null){
    let location = document.querySelector(`#stall${horse.position}`)
    const stallnum = location.querySelector("p");
    stallnum.setAttribute("hidden", "true");
    location.appendChild(horseCard);
 } else{
     horsesContainer.appendChild(horseCard);
 }
  const draggable = horseCard;
  draggable.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", draggable.id);
  });
};

const updateHorses = () => {};

form.addEventListener("submit", submitHandler);
getAllHorses();

for (const dropZone of document.querySelectorAll(".drop-zone")) {
  const stallnum = dropZone.querySelector("p");
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drop-zone--over");
  });

  dropZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drop-zone--over");
   
  });
  document.addEventListener("dragend", (e) => {
    if(dropZone.querySelector('div')===null){stallnum.removeAttribute("hidden");}
  });


  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const droppedElementId = e.dataTransfer.getData("text/plain");
    const droppedElement = document.getElementById(droppedElementId);
    if(dropZone.querySelector('div')===null || dropZone.id === 'freehorses'){dropZone.appendChild(droppedElement);}
    stallnum.setAttribute("hidden", "true");
    dropZone.classList.remove("drop-zone--over");
  });

  
}
