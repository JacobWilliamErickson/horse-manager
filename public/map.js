const horsesContainer = document.querySelector('#freehorses')
const form = document.querySelector('#newHorse')
const baseURL = `http://localhost:4004/api/map.html`;
function displayHorses(arr) {
    horsesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        makeHorseCard(arr[i])
    }
}
const horsesCallback = ({ data: horses }) => displayHorses(horses)
const errCallback = err => console.log(err)
const getAllHorses = ()=> axios.get(baseURL).then(horsesCallback).catch(errCallback)
const createHorse = body => axios.post(baseURL, body).then(horsesCallback).catch(errCallback)
function submitHandler(e) {
    e.preventDefault()
    let name = document.querySelector('#name')
    let barnname = document.querySelector('#barnname')
    let owner = document.querySelector('#owner')
    let age = document.querySelector('#age')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        name: name.value,
        barnname:barnname.value,
        owner:owner.value,
        age:age.value,
        imageURL:imageURL.value,
    }

    createHorse(bodyObj)

    name.value = ''
    barnname.value= ''
    owner.value= ''
    age.value= ''
    imageURL.value= ''
}
const makeHorseCard = (horse) =>{
    const horseCard = document.createElement('div')
    horseCard.classList.add('horse-card')

    horseCard.innerHTML = `<img alt='house cover image' src=${horse.imageURL} class="horse-cover-image"/>
    <div class = 'horse-info'>
        <p class="horse-name">Name: ${horse.name}</p>
        <p class="horse-barnname">Barn Name: ${horse.barnname}</p>
        <p class="horse-owner">Owner: ${horse.owner}</p>
        <p class="horse-age">Age: ${horse.age}</p>
    </div>
    `
    horsesContainer.appendChild(horseCard)
}



const updateHorses = ()=> {


}

form.addEventListener('submit', submitHandler)

getAllHorses()