const form = document.querySelector("#search");
const errCallback = (err) => console.log(err);

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
    axios.post('http://localhost:4004/api/landing.html',bodyObj).then().catch(errCallback);
  }


  form.addEventListener("submit", submitsearchHandler);