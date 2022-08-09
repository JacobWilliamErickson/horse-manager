const baseURL = `/api/map.html`;
let horsedropdown = document.querySelector('#horse-drop-down')
const errCallback = (err) => console.log(err);
let journalbox = document.querySelector('#journalbox')
const form = document.querySelector("#journal-form");
const searchform = document.querySelector('#search')
function submitHandler(e) {
    e.preventDefault();
    let title = document.querySelector("#title");
    let date = document.querySelector("#date");
    let type = document.querySelector("#type");
    let summary = document.querySelector("#journal-content");

    let bodyObj = {
      horse: horsedropdown.value,
      title: title.value,
      date: date.value,
      type: type.value,
      summary: `${summary.value}`+`'`
    };
  
    submitentry(bodyObj);
  //clearing values
    horsedropdown.value = "";
    title.value = "";
    date.value = "";
    type.value = "";
    summary.value = "";
  }

  const submitentry = async (body) => {
    await axios.post('/api/journal.html', body).then(journalCallback).catch(errCallback);
    getAllJournals();
  };

function updatedropdown(arr) {
    horsedropdown.innerHTML = `<option value="" disabled selected>Select a Horse</option>`;
    for (let i = 0; i < arr.length; i++) {
        let horseoption = document.createElement("option");
        horseoption.setAttribute('value',`${arr[i].horse_id}`)
        horseoption.innerHTML=`<p class="horse-name">${arr[i].name}</p>`
        horsedropdown.appendChild(horseoption)
    }
  }

  function displayJournals(arr) {
    journalbox.innerHTML = ``;
    for (let i = 0; i < arr.length; i++) {
      createentries(arr[i]);
    }
  }
  function createentries(journal) {
    let journalCard = document.createElement("div");
    journalCard.classList.add("journal-card");
    journalCard.setAttribute("id", `${journal.journal_id}`);
    journalCard.innerHTML = `
    <div class = 'journal-card-info'>
    <header class = 'journal-card-header'>

        <p id="horse">${journal.name} </p> 
        <p id="title"> Title: ${journal.title} </p> 
        <p id="date"> Date: ${journal.date} </p> 
        <p id="type"> Type: ${journal.type} </p> 
    </header>
    <p id= "summary"> ${journal.summary} </p> 
    </div>
      `;
    journalbox.appendChild(journalCard)
  }
  const horsesCallback = ({ data: horses }) => updatedropdown(horses);
  const journalCallback = ({ data: entries }) => displayJournals(entries);
 const getAllHorses = () => {
        axios.get(baseURL).then(horsesCallback).catch(errCallback);
      };
const getAllJournals = () => {
        axios.get('/api/journal.html').then(journalCallback).catch(errCallback);
      };
function submitsearchHandler(e) {
        e.preventDefault();
        let searchcat = document.querySelector("#searchcat");
        let searchtext = document.querySelector("#searchtext");
        axios.get(`/api/journal.html?searchcat=${searchcat.value}&searchtext=${searchtext.value}`,).then(journalCallback).catch(errCallback);
        searchcat.value = "";
        searchtext.value = "";
      }
window.addEventListener("load" , (event) => {
        getAllHorses()
        getAllJournals()
    });

horsedropdown.addEventListener('change',()=> console.log(horsedropdown.value))
form.addEventListener("submit", submitHandler);
searchform.addEventListener("submit", submitsearchHandler);