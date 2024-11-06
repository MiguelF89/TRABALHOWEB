document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://rickandmortyapi.com/api/character/?page=19";
    const characterList = document.getElementById("character-list");

    function createCharacterCard(character) {
        const card = document.createElement("div");
        card.classList.add("character-card");

        const img = document.createElement("img");
        img.src = character.image;
        img.alt = character.name;
        card.appendChild(img);

        const name = document.createElement("h2");
        name.textContent = character.name;
        card.appendChild(name);

        const status = document.createElement("p");
        const statusSpan = document.createElement("span");
        statusSpan.textContent = character.status === "Alive" ? "Vivo" : 
                                 character.status === "Dead" ? "Morto" : 
                                 "Desconhecido";
        statusSpan.classList.add("status");
        if (character.status === "Alive") {
            statusSpan.classList.add("vivo");
        } else if (character.status === "Dead") {
            statusSpan.classList.add("morto");
        } else {
            statusSpan.classList.add("desconhecido");
        }
        status.appendChild(statusSpan);
        card.appendChild(status);

        const species = document.createElement("p");
        species.textContent = `Espécie: ${character.species}`;
        card.appendChild(species);
        if (character.type) {
            const type = document.createElement("p");
            type.textContent = `Tipo: ${character.type}`;
            card.appendChild(type);
        }

        const origin = document.createElement("p");
        origin.textContent = `Origem: ${character.origin.name}`;
        card.appendChild(origin);

        const location = document.createElement("p");
        location.textContent = `Localização: ${character.location.name}`;
        card.appendChild(location);

        return card;
    }

    async function fetchCharacters() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const characters = data.results;

            characterList.innerHTML = "";

            characters.forEach((character) => {
                const characterCard = createCharacterCard(character);
                characterList.appendChild(characterCard);
            });
        } catch (error) {
            console.error("Erro ao buscar dados da API", error);
        }
    }

    fetchCharacters();
});
