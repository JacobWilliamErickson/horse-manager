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
function submitsearchHandler(e) {
    e.preventDefault();
    let searchcat = document.querySelector("#searchcat");
    let searchtext = document.querySelector("#searchtext");
    axios.get(`/api/landing.html?searchcat=${searchcat.value}&searchtext=${searchtext.value}`,).then(horsesCallback).catch(errCallback);
    searchcat.value = "";
    searchtext.value = "";
  }
  const makeHorseCard = (horse) => {
    let horseCard = document.createElement("div");
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
          <p class="horse-age">Age: ${horse.age}</p>
          <section>
          </div>
      `;
      let section = horseCard.querySelector('.horse-info') 
      if (horse.position>0&&horse.position<11){
        section.innerHTML += `<p class="horse-location">Location: Brown Barn Stall ${horse.position}</p>`
      } else if (horse.position>10&&horse.position<20){
        section.innerHTML += `<p class="horse-location">Location: Red Barn Stall ${horse.position}</p>`
      } else{
        section.innerHTML += `<p class="horse-location">Location: In the Pasture </p>`
      }
      console.log(horse.position)
      horsesContainer.appendChild(horseCard);
    }

  form.addEventListener("submit", submitsearchHandler);