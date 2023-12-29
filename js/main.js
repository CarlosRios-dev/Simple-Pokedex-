/*Navbar*/ 
const iconToggle = document.querySelector('.toggle_icon');
const navbarMenu = document.querySelector('.menu');
const iconClose = document.querySelector('.close_icon');

iconToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

iconClose.addEventListener('click', () => {
    navbarMenu.classList.remove('active');
});

/*PokeApi*/
const pokemonList = document.querySelector("#pokemonList");
const headerButtons = document.querySelectorAll(".btn-header");

let URLS = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URLS + i)
        .then((response) => response.json())
        .then(data => drawPokemon(data))
}

function drawPokemon(data) {

    let types = data.types.map(type => `<p class="pokemon-type btn-${type.type.name}">${type.type.name}</p>`);
    types = types.join('');
    
    /* Primary Color card */
    let primaryType = data.types[0].type.name;
    let type_color = `type-${primaryType}`;

    /* Pokemon Number */
    let dataId = data.id.toString();
    if (dataId.length === 1) {
        dataId = "00" + dataId;
    } else if (dataId.length === 2) {
        dataId = "0" + dataId;
    }

    /* Draw Card */
    const div = document.createElement("div");
    div.classList.add("pokemon-card", `type-${primaryType}`)
    div.innerHTML = `
        <div class="pokemon-img">
            <img src="${data.sprites.other.home.front_default}" alt="${data.name}">
        </div>
        <div class="pokemon-info">
            <div class="container-name">
                <p class="pokemon-id">#${dataId}</p>
                <h2 class="pokemon-name">${data.name}</h2>
            </div>
            <div class="pokemon-types">
            ${types}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${data.height}m</p>
                <p class="stat">${data.weight}kg</p>
            </div>
        </div>
        </div>
    `;
    pokemonList.append(div);
}

/* Buttons events */
headerButtons.forEach(button => button.addEventListener("click", (event) => {
    const buttonId = event.currentTarget.id;

    pokemonList.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URLS + i)
            .then((response) => response.json())
            .then(data => {

                if (buttonId === "view-all") {
                    drawPokemon(data);
                }else {
                    const types = data.types.map(type => type.type.name);
                    if (types.some(type => type.includes(buttonId))) {
                        drawPokemon(data);
                    }
                }    
            })
    }
}))
