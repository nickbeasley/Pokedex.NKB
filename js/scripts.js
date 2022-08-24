let pokemonRepository = (function () {
  let pokemonList = [];

  // linking api - 1.7
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=250";

  //loading message
  let loadingMessage = document.getElementById("loading-message");

  let modalContainer = document.querySelector("#modal-container");

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
    button.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    // button fuction added
    button.addEventListener("click", function () {
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
        item.id = details.id;
        item.weight = details.weight;
        item.height = details.height;
        item.types = details.types.map(function (pokemon) {
          return " " + pokemon.type.name;
        });
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

  //Shows pokemon details when clicked
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      //1.7

      //1.8 below
      modalContainer.innerHTML = "";
      let modal = document.createElement("div");
      modal.classList.add("modal");

      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("modal-close");
      closeButtonElement.innerHTML = "Close";
      closeButtonElement.addEventListener("click", hideModal);

      let navigateLeftElement = document.createElement("div");
      navigateLeftElement.classList.add("pokemon-nav1");
      if (getPokemonIndex(pokemon) === 0) {
        navigateLeftElement.classList.add("pokemon-nav1--disabled");
      }
      navigateLeftElement.innerText = "Previous";
      navigateLeftElement.addEventListener("click", () =>
        loadPreviousPokemon(pokemon)
      );

      let pokemonInfoElement = document.createElement("div");
      pokemonInfoElement.classList.add("pokemon-info");

      let pokemonContainerElement = document.createElement("div");
      pokemonContainerElement.classList.add("pokemon-container");

      let titleElement = document.createElement("h1");
      titleElement.innerText =
        pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

      let pictureElement = document.createElement("img");
      pictureElement.classList.add("pokemon-img");
      pictureElement.src = pokemon.imageUrl;

      let idElement = document.createElement("p");
      idElement.innerText = "#" + pokemon.id;

      let heightElement = document.createElement("p");
      heightElement.innerText = "Height: " + pokemon.height + "ft";

      let weightElement = document.createElement("p");
      weightElement.innerText = "Weight: " + pokemon.weight + "lbs";

      let typesElement = document.createElement("p");
      typesElement.innerText = "Types: " + pokemon.types;

      let navigateRightElement = document.createElement("div");
      navigateRightElement.classList.add("pokemon-nav2");
      if (getPokemonIndex(pokemon) === 249) {
        navigateRightElement.classList.add("pokemon-nav2--disabled");
      }
      navigateRightElement.innerText = "Next";
      navigateRightElement.addEventListener("click", () =>
        loadNextPokemon(pokemon)
      );

      modal.appendChild(closeButtonElement);
      pokemonInfoElement.appendChild(titleElement);
      pokemonInfoElement.appendChild(pictureElement);
      pokemonInfoElement.appendChild(idElement);
      pokemonInfoElement.appendChild(heightElement);
      pokemonInfoElement.appendChild(weightElement);
      pokemonInfoElement.appendChild(typesElement);
      pokemonContainerElement.appendChild(navigateLeftElement);
      pokemonContainerElement.appendChild(pokemonInfoElement);
      pokemonContainerElement.appendChild(navigateRightElement);

      modal.appendChild(pokemonContainerElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add("is-visible");
    });
  } //1.8

  let diologPromiseReject;

  function hideModal() {
    modalContainer.classList.remove("is-visible");
    if (diologPromiseReject) {
      diologPromiseReject();
      diologPromiseReject = null;
    }
  }
  addEventListener("keydown", (e) => {
    if (e.key === "escape" && modalContainer.classList.contains("is-visble")) {
      hideModal();
    }
  }); //1.8

  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      hideModal();
    }
  }); //1.8

  function getPokemonIndex(pokemon) {
    return pokemonList.findIndex((p) => p.name === pokemon.name);
  } //1.8

  function loadPreviousPokemon(pokemon) {
    showDetails(pokemonList[getPokemonIndex(pokemon) - 1]);
  }

  function loadNextPokemon(pokemon) {
    showDetails(pokemonList[getPokemonIndex(pokemon) + 1]);
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

/* Search Bar - not working 
function searchFunction() {
  document.getElementById("pokemon-search").addEventListener("keyup", (e) => {
    let value = value.toLowerCase();
    document.getElementByClassName(".button-class").filter(function () {
      this.toggle(this.innerText.toLowerCase().indexOf(value) > -1);
    });
  });
}


let box = document.querySelectorAll("button-class");

function searchFunction() {
  let search_query = document.getElementById("pokemon-search").value;

  for (var i = 0; i < box.length; i++) {
    if (box[i].toLowerCase().includes(search_query.toLowerCase())) {
      box[i].classList.remove("is-hidden");
    } else {
      box[i].classList.add("is-hidden");
    }
  }
};
*/
