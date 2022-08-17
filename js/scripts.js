let pokemonRepository = (function () {
  let repository = [
    {
      name: "Venosaur",
      height: 2,
      weight: 350,
      type: ["grass", "poison"],
    },
    {
      name: "Blastoise",
      height: 3,
      weight: 400,
      type: ["water"],
    },
    {
      name: "Charzard",
      height: 4,
      weight: 450,
      type: ["fire", "dragon"],
    },
    {
      name: "Pikachu",
      height: 1.5,
      weight: 40,
      type: ["electic"],
    },
    {
      name: "Gengar",
      height: 2,
      weight: 2,
      type: ["ghost", "psycic"],
    },
    {
      name: "Muk",
      height: 1.3,
      weight: 150,
      type: ["poison"],
    },
  ];

  //add function here, can only add if pokemon is an "object"
  //the object has to have a name, weight, height, and type
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      repository.push(pokemon);
    }
  }

  //getAll fuction here
  function getAll() {
    return repository;
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
    button.addEventListener("click", function () {
      showDetails(pokemon);
    }); //1.6
  }
  //Shows pokemon details in console when clicked
  function showDetails(pokemon) {
    console.log(pokemon); //1.6
  }
  return {
    add,
    getAll,
    addListItem,
  };
})();
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
