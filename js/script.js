// let pokemons = [];
// let pokeObj = [];
// let nextPage;
// let previousPage;

// /**
//  * Get pokemons url
//  * @returns array pokemons urls
//  */
// const getPokemonUrl = async (url = "https://pokeapi.co/api/v2/pokemon/") => {
//     const data = await fetchGet(url);

//     data.results.forEach(pokemon => {
//         pokemons.push(pokemon.url);
//     });
//     nextPage = data.next;
//     previousPage = data.previous;

//     return pokemons;
// }

// const getExtendedPokemonData = async () => {
//     const pokeArry = await getPokemonUrl();

//     for (const url of pokeArry) {
//         const data = await fetchGet(url);
//         pokeObj.push(data);
//     }

//     const cardContainer = document.getElementById('cardContainer');

//     pokeObj.forEach(element => {
//         const card = createPokemonCard(element);
//         cardContainer.appendChild(card);
//     });
// }

// async function fetchGet(url) {
//     const request = await fetch(url),
//         response = await request.json();
//     return response;
// }

// function createPokemonCard(pokemonData) {
//     const card = document.createElement('div');
//     card.classList.add('card');

//     const imgContainer = document.createElement('div');
//     imgContainer.classList.add('imgContainer');
//     imgContainer.classList.add(pokemonData.types[0].type.name);
//     const img = document.createElement('img');
//     img.src = pokemonData.sprites.front_default;
//     imgContainer.appendChild(img);

//     const nameAndNumber = document.createElement('div');
//     nameAndNumber.classList.add('nameAndNumber');
//     const name = document.createElement('p');
//     name.textContent = pokemonData.name;
//     const number = document.createElement('p');
//     number.textContent = `#${pokemonData.id.toString().padStart(3, '0')}`;
//     nameAndNumber.appendChild(name);
//     nameAndNumber.appendChild(number);

//     const typesAndKnowMore = document.createElement('div');
//     typesAndKnowMore.classList.add('typesAndKnowMore');
//     const types = document.createElement('div');
//     types.classList.add('types');
//     pokemonData.types.forEach(type => {
//         const typeImg = document.createElement('img');
//         typeImg.src = `https://pokeapi.co/media/sprites/types/${type.type.name}.png`;
//         types.appendChild(typeImg);
//     });
//     const knowMore = document.createElement('a');
//     knowMore.textContent = 'Know More';
//     knowMore.href = pokemonData.species.url;
//     typesAndKnowMore.appendChild(types);
//     typesAndKnowMore.appendChild(knowMore);

//     card.appendChild(imgContainer);
//     card.appendChild(nameAndNumber);
//     card.appendChild(typesAndKnowMore);

//     return card;
// }

// window.addEventListener("DOMContentLoaded", getExtendedPokemonData);



let pokemons = [];
        let pokeObj = [];
        let nextPage;
        let previousPage;
        let isLoading = false; // Variable para evitar múltiples llamadas mientras se carga

        /**
         * Get pokemons url
         * @returns array pokemons urls 
         */
        const getPokemonUrl = async (url = "https://pokeapi.co/api/v2/pokemon/") => {
            const data = await fetchGet(url);

            data.results.forEach(pokemon => {
                pokemons.push(pokemon.url);
            });
            nextPage = data.next;
            previousPage = data.previous;

            return pokemons;
        }

        const getExtendedPokemonData = async () => {
            const pokeArry = await getPokemonUrl();

            for (const url of pokeArry) {
                const data = await fetchGet(url);
                pokeObj.push(data);
            }

            const cardContainer = document.getElementById('cardContainer');

            pokeObj.forEach(element => {
                const card = createPokemonCard(element);
                cardContainer.appendChild(card);
            });
        }

        async function fetchGet(url) {
            const request = await fetch(url),
                response = await request.json();
            return response;
        }

        function createPokemonCard(pokemonData) {
            const card = document.createElement('div');
            card.classList.add('card');

            const imgContainer = document.createElement('div');
            imgContainer.classList.add('imgContainer');
            imgContainer.classList.add(pokemonData.types[0].type.name);
            const img = document.createElement('img');
            img.src = pokemonData.sprites.front_default;
            img.alt = pokemonData.name;
            imgContainer.appendChild(img);

            const nameAndNumber = document.createElement('div');
            nameAndNumber.classList.add('nameAndNumber');
            const name = document.createElement('p');
            name.textContent = pokemonData.name;
            const number = document.createElement('p');
            number.textContent = `#${pokemonData.id.toString().padStart(3, '0')}`;
            nameAndNumber.appendChild(name);
            nameAndNumber.appendChild(number);

            const typesAndKnowMore = document.createElement('div');
            typesAndKnowMore.classList.add('typesAndKnowMore');
            const types = document.createElement('div');
            types.classList.add('types');
            pokemonData.types.forEach(type => {
                const typeImg = document.createElement('img');
                typeImg.src = `https://pokeapi.co/media/sprites/types/${type.type.name}.png`;
                types.appendChild(typeImg);
            });
            const knowMore = document.createElement('a');
            knowMore.textContent = 'Know More';
            knowMore.href = pokemonData.species.url;
            typesAndKnowMore.appendChild(types);
            typesAndKnowMore.appendChild(knowMore);

            card.appendChild(imgContainer);
            card.appendChild(nameAndNumber);
            card.appendChild(typesAndKnowMore);

            return card;
        }

        window.addEventListener("DOMContentLoaded", () => {
            const loadMoreBtn = document.getElementById('loadMoreBtn');

            // Evento de clic en el botón "Cargar más"
            loadMoreBtn.addEventListener('click', async () => {
                loadMoreBtn.disabled = true;
                await getExtendedPokemonData();
                loadMoreBtn.disabled = false;
            });

            // Cargar los primeros Pokémon al cargar la página
            getExtendedPokemonData();
        });