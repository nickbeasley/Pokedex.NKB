let pokemonRepository = (function () {
  let pokemonList = [];

  // linking api - 1.7
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=250";

  //loading message
  let loadingMessage = document.getElementById("loading-message");

  let modalContainer = document.querySelector("#modal-container");

  let searchField = document.querySelector("#pokedex-search");

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

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group-horizontal");
    let listItem = document.createElement("li");
    listItem.classList.add("group-list-item");
    let buttonItem = document.createElement("button");
    buttonItem.classList.add("pokemonButton");
    buttonItem.innerText =
      pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    buttonItem.setAttribute("data-toggle", "modal");
    buttonItem.setAttribute("data-target", "#pokemon-modal");
    $(buttonItem).addClass("button-class btn-block btn m1");
    buttonItem.classList.add("button-class");
    listItem.appendChild(buttonItem);
    pokemonList.appendChild(listItem);
    buttonItem.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon);
    });
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
        item.backImageUrl = details.sprites.back_default;
        item.id = details.id;
        item.weight = details.weight;
        item.height = details.height;
        item.types = details.types.map(function (pokemon) {
          return " " + pokemon.type.name;
        });
        item.abilities = details.abilities.map(function (pokemon) {
          return " " + pokemon.ability.name;
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
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalFooter = $(".modal-footer");

    modalTitle.empty();
    modalBody.empty();
    modalFooter.empty();

    let nameElement = $(
      "<h3>" + pokemon.name[0].toUpperCase() + pokemon.name.slice(1) + "</h3>"
    );
    let imageElement = $('<img class="pokemon-img">');
    imageElement.attr("src", pokemon.imageUrl);
    let backImageElement = $('<img class="pokemon-img2">');
    backImageElement.attr("src", pokemon.backImageUrl);
    let idElement = $('<p class = "modal-item">' + "#" + pokemon.id + "</p>");
    let heightElement = $(
      '<p class = "modal-item">' + "Height: " + pokemon.height + "ft" + "</p>"
    );
    let weightElement = $(
      '<p class = "modal-item">' + "Weight: " + pokemon.weight + "lbs" + "</p>"
    );
    let typeElement = $(
      '<p class = "modal-item">' + "Types: " + pokemon.types + "</p>"
    );
    let abilityElement = $(
      '<p class = "modal-item">' + "Abilities: " + pokemon.abilities + "</p>"
    );
    let navigateLeftElement = document.createElement("div");
    navigateLeftElement.classList.add("pokemon-nav1");
    if (getPokemonIndex(pokemon) === 0) {
      navigateLeftElement.classList.add("pokemon-nav1--disabled");
    }
    navigateLeftElement.innerText = "Previous";
    navigateLeftElement.addEventListener("click", () =>
      loadPreviousPokemon(pokemon)
    );
    let navigateRightElement = document.createElement("div");
    navigateRightElement.classList.add("pokemon-nav2");
    if (getPokemonIndex(pokemon) === 249) {
      navigateRightElement.classList.add("pokemon-nav2--disabled");
    }
    navigateRightElement.innerText = "Next";
    navigateRightElement.addEventListener("click", () =>
      loadNextPokemon(pokemon)
    );

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(backImageElement);
    modalBody.append(idElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilityElement);
    modalFooter.append(navigateLeftElement);
    modalFooter.append(navigateRightElement);
  }

  function hideModal() {
    modalContainer.classList.remove("show-modal");
  }

  function getPokemonIndex(pokemon) {
    return pokemonList.findIndex((p) => p.name === pokemon.name);
  } //1.8

  function loadPreviousPokemon(pokemon) {
    showDetails(pokemonList[getPokemonIndex(pokemon) - 1]);
  }

  function loadNextPokemon(pokemon) {
    showDetails(pokemonList[getPokemonIndex(pokemon) + 1]);
  }

  searchField.addEventListener("input", function () {
    let pokeList = document.querySelectorAll(".pokemonButton");
    let filterValue = searchField.value.toUpperCase();

    pokeList.forEach(function (pokemon) {
      if (pokemon.innerText.toUpperCase().indexOf(filterValue) > -1) {
        pokemon.style.display = "";
      } else {
        pokemon.style.display = "none";
      }
    });
  });

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
