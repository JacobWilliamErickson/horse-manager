const baseURL = `http://localhost:4004/api/map.html`;
let horsedropdown = document.querySelector('#horse-drop-down')
const errCallback = (err) => console.log(err);

function updatedropdown(arr) {
    horsedropdown.innerHTML = `<option value="" disabled selected>Select a Horse</option>`;
    for (let i = 0; i < arr.length; i++) {
        let horseoption = document.createElement("option");
        horseoption.setAttribute('value',`${arr[i].horse_id}`)
        horseoption.innerHTML=`<p class="horse-name">${arr[i].name}</p>`
        horsedropdown.appendChild(horseoption)
    }
  }
  const horsesCallback = ({ data: horses }) => updatedropdown(horses);
 const getAllHorses = () => {
        axios.get(baseURL).then(horsesCallback).catch(errCallback);
      };

window.addEventListener("load" , (event) => {
        getAllHorses()
    });

horsedropdown.addEventListener('change',()=> console.log(horsedropdown.value))