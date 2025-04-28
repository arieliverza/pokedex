const botaoBuscar = document.getElementById('buscar');
const entrada = document.getElementById('entrada');
const resultado = document.getElementById('resultado');

botaoBuscar.addEventListener('click', () => {
    const pokemon = entrada.value.trim().toLowerCase();
    if(pokemon) {
        buscarPokemon(pokemon);
    }
});

function buscarPokemon(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    fetch(url)
        .then(resposta => resposta.json())
        .then(dados => {
            mostarPokemon(dados);
        })
        .catch(() => {
            resultado.innerHTML = `<p style="color: red;">Pokémon não encontrado. Tente novamente! 🔎</p>`;
        });
}

function mostarPokemon(dados) {
    const nome = dados.nome;
    const id = dados.id;
    const imagem = dados.sprites.font_default;
    const tipo = dados.types[0].type.name;

    resultado.innerHTML = `
        <h2>${nome} (#${id})</h2>
        <img src="${imagem}" alt="${nome}">
        <p>Tipo: ${tipo}</p>
    `;
}