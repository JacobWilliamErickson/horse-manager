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
//error message
const errCallback = (err) => console.log(err);
const getAllHorses = () => {
  axios.get(baseURL).then(horsesCallback).catch(errCallback);
};
const createHorse = async (body) => {
  await axios.post(baseURL, body).then(horsesCallback).catch(errCallback);
  getAllHorses();
};
//new horse submit handler
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
//clearing values
  name.value = "";
  barnname.value = "";
  owner.value = "";
  age.value = "";
  imageURL.value = "";
}
//makes individual cards in html
const makeHorseCard = (horse) => {
  const horseCard = document.createElement("div");
  horseCard.classList.add("horse-card");
  horseCard.setAttribute("draggable", true);
  horseCard.setAttribute("id", `${horse.horse_id}`);
  horseCard.innerHTML = `
  <div class = 'horse-card-info'>
        <img alt='horse cover image' src=${horse.imageurl} class="horse-cover-image" draggable = 'false'/>
        <section class='horse-info'>
        <p class="horse-name">${horse.name}</p>
        <p class="horse-barnname">Barn Name: ${horse.barnname}</p>
        <p class="horse-owner">Owner: ${horse.owner}</p>
        <section>
        </div>
        <p class="horse-age">${horse.age}</p>
    `;

  let location = document.querySelector(`#stall${horse.position}`);
  //if the horse isn't already in the box and there is a stall to match its postion put card in there
  if (
    document.querySelector(`#stall${horse.position}`) !== null &&
    location.querySelector("div") === null
  ) {
    const stallnum = location.querySelector("p");
    stallnum.setAttribute("hidden", "true");
    location.appendChild(horseCard);
    location.classList.remove("empty");
    location.classList.add('occupied')
    //if it can't find a place. place in free horses
  } else if (document.querySelector(`#stall${horse.position}`) === null) {
    horsesContainer.appendChild(horseCard);
  }
  //making draggable object
  const draggable = horseCard;
  draggable.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", draggable.id);
  });
};

form.addEventListener("submit", submitHandler);
getAllHorses();

//DROP ZONE STUFF
for (const dropZone of document.querySelectorAll(".drop-zone")) {
  const stallnum = dropZone.querySelector("p");
  //dragover increases opacity
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drop-zone--over");
  });
//dragleave sets opacity back
  dropZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drop-zone--over");
  });
//when ending a drag, number returns to empty stalls
  document.addEventListener("dragend", (e) => {
    if (dropZone.querySelector("div") === null) {
      stallnum.removeAttribute("hidden");
      dropZone.classList.add('empty')
      dropZone.classList.remove('occupied')
    }
  });
//drop moves elements and sents put request to change position in database
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const droppedElementId = e.dataTransfer.getData("text/plain");
    const droppedElement = document.getElementById(droppedElementId);
    console.log( dropZone.querySelector("div"))
    if (
     dropZone.classList.contains('empty') && dropZone.id !== "freehorses"
    ) {
      dropZone.appendChild(droppedElement);
      dropZone.classList.remove('empty')
      dropZone.classList.add("occupied");
      stallnum.setAttribute("hidden", "true");
      dropZone.classList.remove("drop-zone--over");
      axios
        .put(`${baseURL}`, {
          stall: dropZone.dataset.stall,
          id: droppedElement.id,
        })
        .then(getAllHorses())
        .catch(errCallback);


    } else if(dropZone.classList.contains('empty') && dropZone.id) {dropZone.appendChild(droppedElement);
      dropZone.classList.remove("drop-zone--over");
      axios
        .put(`${baseURL}`, {
          stall: dropZone.dataset.stall,
          id: droppedElement.id,
        })
        .then(getAllHorses())
        .catch(errCallback);
    } 
    else{
      dropZone.classList.remove("drop-zone--over");
    }
  });
}
