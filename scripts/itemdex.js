function getItens(url) {
  fetch(url).then((resp) =>
    resp.json().then((resp) => {
      const mainContainer = document.getElementById("main-container");
      const next = resp.next;
      const results = resp.results;
      for (let i = 0; i < results.length; i++) {
        fetch(`https://pokeapi.co/api/v2/item/${resp.results[i].name}`).then(
          (resp) =>
            resp
              .json()
              .then((resp) => {
                //   console.log(resp);
                if (!(resp.sprites.default == null)) {
                  let itemCard = document.createElement("div");
                  let itemInfo = document.createElement("div");
                  let itemImg = document.createElement("img");
                  let itemDesc = document.createElement("p");
                  let itemTitle = document.createElement("h5");

                  itemImg.src = resp.sprites.default;
                  itemDesc.innerText = resp.effect_entries["0"].effect;
                  itemCard.className = "item-card";
                  let itemName = resp.name;
                  let finalName =
                    itemName.charAt(0).toUpperCase() + itemName.slice(1);
                  itemTitle.innerText = finalName;

                  itemInfo.appendChild(itemTitle);
                  itemInfo.appendChild(itemDesc);

                  itemCard.appendChild(itemImg);
                  itemCard.appendChild(itemInfo);
                  mainContainer.appendChild(itemCard);
                }
              })
              .catch("Item does not exists!")
        );
      }
      getItens(next);
    })
  );
}

getItens("https://pokeapi.co/api/v2/item/");
