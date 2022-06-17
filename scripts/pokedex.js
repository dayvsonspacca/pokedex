const colours = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

function getPokes(url) {
  fetch(url).then((resp) =>
    resp.json().then((resp) => {
      const newUrl = resp.next;
      const pokes = resp.results;
      const pokeMenu = document.getElementById("main-container");
      for (let i = 0; i < pokes.length; i++) {
        let pokeCard = document.createElement("div");
        let pokeImg = document.createElement("img");
        let types = document.createElement("div");

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokes[i].name}`).then(
          (resp) =>
            resp.json().then((resp) => {
              pokeImg.src =
                resp.sprites.other["official-artwork"].front_default;
              if (resp.types.length == 2) {
                for (let i = 0; i < 2; i++) {
                  let type = document.createElement("a");
                  type.className = "poke-type";
                  let typeName = resp.types[i].type.name;
                  let finalName =
                    typeName.charAt(0).toUpperCase() + typeName.slice(1);
                  type.innerText = finalName;
                  type.href = "";
                  type.style.color = `${colours[typeName]}`;
                  types.appendChild(type);
                }
              } else {
                let type = document.createElement("a");
                type.className = "poke-type";
                let typeName = resp.types[0].type.name;
                let finalName =
                  typeName.charAt(0).toUpperCase() + typeName.slice(1);
                type.innerText = finalName;
                type.href = "";
                type.style.color = `${colours[typeName]}`;
                type.style.width = "150px";
                types.appendChild(type);
              }
            })
        );

        pokeCard.className = "poke-card";
        pokeImg.className = "poke-img";
        types.className = "types";
        pokeCard.appendChild(pokeImg);
        pokeCard.appendChild(types);
        pokeMenu.appendChild(pokeCard);
      }
      getPokes(newUrl);
    })
  );
}

getPokes("https://pokeapi.co/api/v2/pokemon");
