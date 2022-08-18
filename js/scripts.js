let pokemonRepository = (function () {
  let pokemonList = [];

  // linking api - 1.7
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //loading message
  let loadingMessage = document.getElementById("loading-message");

  //add function here, can only add if pokemon is an "object"
  //the object has to have a name, weight, height, and type
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  //getAll fuction here
  function getAll() {
    return pokemonList;
  }

  //Creating the list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");

    //Button created and added with a class
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    // button fuction added
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    }); //1.6
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  } //1.7

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  } //1.7

  function showLoadingMessage() {
    loadingMessage.innerText = "Loading...";
  } //1.7
  function hideLoadingMessage() {
    loadingMessage.innerText = "";
  } //1.7

  //Shows pokemon details in console when clicked
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      //1.7
      console.log(item); //1.6
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
}); //1.7
