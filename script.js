const botaoBuscar = document.getElementById('buscar');
const entrada = document.getElementById('entrada');
const resultado = document.getElementById('resultado');

botaoBuscar.addEventListener('click', () => {
    const pokemon = entrada.value.trim().toLowerCase();
    if (pokemon) {
        buscarPokemon(pokemon);
    }
});

function buscarPokemon(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    resultado.innerHTML = `<p>🔎 Buscando Pokémon...</p>`;

    fetch(url)
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error('Pokémon não encontrado');
            }
            return resposta.json();
        })
        .then(dados => {
            mostrarPokemon(dados);
        })
        .catch(() => {
            resultado.classList.add('visivel');
            resultado.innerHTML = `
            <p style="color: red;">Pokémon não encontrado. Tente novamente! 🔎</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png" alt="Pokémon não encontrado" style="margin-top: 10px; width: 100px;">
            `;
            setTimeout(() => resultado.classList.add('visivel'), 10);
        });

}

function mostrarPokemon(dados) {
    const nome = dados.name;
    const id = dados.id;
    const imagem = dados.sprites.front_default;
    const tipo = dados.types[0].type.name;
  
    let tipoClasse = tipo;
    if (tipo === 'electric') tipoClasse = 'eletrico';
    else if (tipo === 'psychic') tipoClasse = 'psiquico';
    else if (tipo === 'ice') tipoClasse = 'gelo';
    else if (tipo === 'dark') tipoClasse = 'sombrio';
    else if (tipo === 'fairy') tipoClasse = 'fada';
    else if (tipo === 'fire') tipoClasse = 'fogo';
    else if (tipo === 'water') tipoClasse = 'agua';
    else if (tipo === 'grass') tipoClasse = 'grama';

    resultado.classList.remove('visivel');
    resultado.innerHTML = `
      <h2>${nome} (#${id})</h2>
      <img src="${imagem}" alt="${nome}">
      <p class="tipo tipo-${tipoClasse}">Tipo: ${tipo}</p>
    `;

    setTimeout(() => resultado.classList.add('visivel'), 10);

  }
  
