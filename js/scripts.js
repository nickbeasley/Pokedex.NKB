let pokemonRepostitory = (function () {
  let pokemonList = [
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
  //getAll fuction here
  function getAll(pokemon) {
    return pokemonList;
  }
  //add function here, can only add if pokemon is an "object"
  //the object has to have a name, weight, height, and type
  function add(pokemon) {
    if (typeof pokemon == "object") {
      if (
        "name" in pokemon &&
        "height" in pokemon &&
        "weight" in pokemon &&
        "type" in pokemon
      ) {
        pokemonList.push(pokemon);
      }
    }
  }

  return {
    getAll: getAll,
    add: add,
  };
})();
//adding a pokemon to the list
pokemonRepostitory.add({
  name: "Meowth",
  height: 1.6,
  weight: 50,
  type: ["noraml"],
});

let pokemonList = pokemonRepostitory.getAll();

document.write('<div class="pokemon-list">');

//listing pokemon with weight comments
pokemonList.forEach(function (pokemon) {
  if (pokemon.weight > 100 && pokemon.weight < 300) {
    document.write("<p>" + pokemon.name + " is a medium sized pokemon. </p>");
  } else if (pokemon.weight < 100) {
    document.write("<p>" + pokemon.name + " is a little guy </p>");
  } else {
    document.write("<p>" + pokemon.name + " is a big boy </p>");
  }
});

document.write("</div>");

document.write('<div class="pokemone-list2">');

//listing all pokemon
pokemonList.forEach(function (pokemon) {
  if (pokemon) {
    document.write("<p>" + pokemon.name + "</p>");
  }
});

document.write("</div>");

/*
//Full pokemon list 
document.write('<div class="pokemon-list">');
//this line is looping through the lists array items
for (let b = 0; b < pokemonList.length; b++) {
  //if there is a pokemonlist array item in slot b, which changes, then it writes the pokemon's name with a space
  if (pokemonList[b]) {
    document.write(pokemonList[b].name + " ");
  }
}
document.write("</div>");

//Pokemon size loop 
document.write('<div class="pokemone-list2">');
//this line is looping through the lists array items
for (let a = 0; a < pokemonList.length; a++) {
  //if a pokemon is between 100 and 300 then its a medium pokemen
  if (pokemonList[a].weight > 100 && pokemonList[a].weight < 300) {
    document.write(pokemonList[a].name + " is a medium sized pokemon. ");
    //if a pokemon is under 100 then its a little guy
  } else if (pokemonList[a].weight < 100) {
    document.write(pokemonList[a].name + " is a just little guy. <br>");
    //anything else, which is just bigger than 300, makes the pokemon a big boy
  } else {
    document.write(pokemonList[a].name + " is a big boy! <br>");
  }
}
document.write("</div>");
*/
