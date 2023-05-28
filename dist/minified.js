let pokemonRepository = (function () {
  let e = [],
    t = document.getElementById("loading-message"),
    n = document.querySelector("#modal-container"),
    i = document.querySelector("#pokedex-search"),
    a = document.querySelector(".list-group-horizontal");
  function o(t) {
    "object" == typeof t && "name" in t
      ? e.push(t)
      : console.log("pokemon is not correct");
  }
  function s() {
    return e;
  }
  function l(e) {
    let t = document.createElement("li");
    t.classList.add("group-list-item");
    let n = document.createElement("button");
    n.classList.add("pokemonButton"),
      (n.innerText = e.name[0].toUpperCase() + e.name.slice(1)),
      n.setAttribute("data-toggle", "modal"),
      n.setAttribute("data-target", "#pokemon-modal"),
      n.classList.add("button-class"),
      t.appendChild(n),
      a.appendChild(t),
      n.addEventListener("click", function () {
        r(e);
      });
  }
  function r(t) {
    p(t).then(function () {
      var n;
      let i, a, o, s, l, d, p, c, m, u, h, g, k;
      (n = t),
        (i = $(".modal-body")),
        (a = $(".modal-title")),
        (o = $(".modal-footer")),
        a.empty(),
        i.empty(),
        o.empty(),
        (s = $("<h3>" + n.name[0].toUpperCase() + n.name.slice(1) + "</h3>")),
        (l = $('<img class="pokemon-img">')).attr("src", n.imageUrl),
        (d = $('<img class="pokemon-img2">')).attr("src", n.backImageUrl),
        (p = $('<p class="modal-item">#' + n.id + "</p>")),
        (c = $('<p class="modal-item">Height: ' + n.height + "ft</p>")),
        (m = $('<p class="modal-item">Weight: ' + n.weight + "lbs</p>")),
        (u = $('<p class="modal-item">Types: ' + n.types + "</p>")),
        (h = $('<p class="modal-item">Abilities: ' + n.abilities + "</p>")),
        (g = document.createElement("div")).classList.add("pokemon-nav1"),
        0 === f(n) && g.classList.add("pokemon-nav1--disabled"),
        (g.innerText = "Previous"),
        g.addEventListener("click", () => {
          var t;
          return (t = n), void r(e[f(t) - 1]);
        }),
        (k = document.createElement("div")).classList.add("pokemon-nav2"),
        f(n) === e.length - 1 && k.classList.add("pokemon-nav2--disabled"),
        (k.innerText = "Next"),
        k.addEventListener("click", () => {
          var t;
          return (t = n), void r(e[f(t) + 1]);
        }),
        a.append(s),
        i.append(l),
        i.append(d),
        i.append(p),
        i.append(c),
        i.append(m),
        i.append(u),
        i.append(h),
        o.append(g),
        o.append(k),
        console.log(t);
    });
  }
  function d(t = "") {
    return (
      c(),
      fetch("https://pokeapi.co/api/v2/pokemon/?limit=250")
        .then(function (e) {
          return e.json();
        })
        .then(function (n) {
          (e = []),
            n.results.forEach(function (e) {
              var n, i;
              let a = { name: e.name, detailsUrl: e.url };
              (n = a),
                (i = t),
                n.name.toUpperCase().includes(i.toUpperCase()) && o(a);
            }),
            m();
        })
        .catch(function (e) {
          console.error(e), m();
        })
    );
  }
  function p(e) {
    return (
      c(),
      fetch(e.detailsUrl)
        .then(function (e) {
          return e.json();
        })
        .then(function (t) {
          (e.imageUrl = t.sprites.front_default),
            (e.backImageUrl = t.sprites.back_default),
            (e.id = t.id),
            (e.weight = t.weight),
            (e.height = t.height),
            (e.types = t.types.map(function (e) {
              return " " + e.type.name;
            })),
            (e.abilities = t.abilities.map(function (e) {
              return " " + e.ability.name;
            })),
            m();
        })
        .catch(function (e) {
          console.error(e), m();
        })
    );
  }
  function c() {
    t.innerText = "Loading...";
  }
  function m() {
    t.innerText = "";
  }
  function u() {
    n.classList.remove("show-modal");
  }
  function f(t) {
    return e.findIndex((e) => e.name === t.name);
  }
  return (
    i.addEventListener("input", function () {
      let t = i.value.trim();
      (a.innerHTML = ""),
        d(t).then(function () {
          e.forEach(function (e) {
            l(e);
          });
        });
    }),
    {
      add: o,
      getAll: s,
      addListItem: l,
      loadList: d,
      loadDetails: p,
      showDetails: r,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
