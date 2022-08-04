const form = document.querySelector("#search");
const horsesContainer = document.querySelector('#horse-cards')
const errCallback = (err) => console.log(err);
function displayHorses(arr) {
    horsesContainer.innerHTML = ``;
    for (let i = 0; i < arr.length; i++) {
      makeHorseCard(arr[i]);
    }
  }
  const horsesCallback = ({ data: horses }) => displayHorses(horses);
  const getAllHorses = () => {
    horsecardnum = 0;
    axios.get(baseURL).then(horsesCallback).catch(errCallback);
  };
  const createHorse = async (body) => {
    await axios.post(baseURL, body).then(horsesCallback).catch(errCallback);
    getAllHorses();
  };
function submitsearchHandler(e) {
    e.preventDefault();
    let searchcat = document.querySelector("#searchcat");
    let searchtext = document.querySelector("#searchtext");

    let bodyObj = {
        searchcat:searchcat.value,
        searchtext:searchtext.value,
    };
    
    console.log(searchcat)
    searchcat.value = "";
    searchtext.value = "";
    console.log(bodyObj)
    axios.post('http://localhost:4004/api/landing.html',bodyObj).then(horsesCallback).catch(errCallback);
  }
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
      horsesContainer.appendChild(horseCard);
    }

  form.addEventListener("submit", submitsearchHandler);