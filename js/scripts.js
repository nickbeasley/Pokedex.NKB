let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=250";
  let loadingMessage = document.getElementById("loading-message");
  let modalContainer = document.querySelector("#modal-container");
  let searchField = document.querySelector("#pokedex-search");
  let pokemonListContainer = document.querySelector(".list-group-horizontal");

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let listItem = document.createElement("li");
    listItem.classList.add("group-list-item");
    let buttonItem = document.createElement("button");
    buttonItem.classList.add("pokemonButton");
    buttonItem.innerText =
      pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    buttonItem.setAttribute("data-toggle", "modal");
    buttonItem.setAttribute("data-target", "#pokemon-modal");
    buttonItem.classList.add("button-class");
    listItem.appendChild(buttonItem);
    pokemonListContainer.appendChild(listItem);
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

  function loadList(filterQuery = "") {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        pokemonList = []; // Clear the previous list
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          if (matchesFilter(pokemon, filterQuery)) {
            add(pokemon);
          }
        });
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  }

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
  }

  function showLoadingMessage() {
    loadingMessage.innerText = "Loading...";
  }

  function hideLoadingMessage() {
    loadingMessage.innerText = "";
  }

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
    let idElement = $('<p class="modal-item">' + "#" + pokemon.id + "</p>");
    let heightElement = $(
      '<p class="modal-item">' + "Height: " + pokemon.height + "ft" + "</p>"
    );
    let weightElement = $(
      '<p class="modal-item">' + "Weight: " + pokemon.weight + "lbs" + "</p>"
    );
    let typeElement = $(
      '<p class="modal-item">' + "Types: " + pokemon.types + "</p>"
    );
    let abilityElement = $(
      '<p class="modal-item">' + "Abilities: " + pokemon.abilities + "</p>"
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
    if (getPokemonIndex(pokemon) === pokemonList.length - 1) {
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
  }

  function loadPreviousPokemon(pokemon) {
    showDetails(pokemonList[getPokemonIndex(pokemon) - 1]);
  }

  function loadNextPokemon(pokemon) {
    showDetails(pokemonList[getPokemonIndex(pokemon) + 1]);
  }

  function matchesFilter(pokemon, filterQuery) {
    return pokemon.name.toUpperCase().includes(filterQuery.toUpperCase());
  }

  searchField.addEventListener("input", function () {
    let filterValue = searchField.value.trim();
    pokemonListContainer.innerHTML = ""; // Clear the previous list
    loadList(filterValue).then(function () {
      getAll().forEach(function (pokemon) {
        addListItem(pokemon);
      });
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
});
