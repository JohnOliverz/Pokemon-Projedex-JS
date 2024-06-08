const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemom__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonCry = document.querySelector('.pokemon__cry');

const form = document.querySelector('.form');
const entrada = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');


let searchPokemon = 1;

//Funçao assíncrona que pegas os Dados da API
const buscarPokemon = async (pokemon) => {

    const RespostaAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (RespostaAPI.status === 200) {

    const data = await RespostaAPI.json();

    return data;
    }
}

const mostrarPokemon = async (pokemon) =>{
    
    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = "Carregando...";

    const data = await buscarPokemon(pokemon);

    if(data){
        
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-iv']['heartgold-soulsilver']['front_default'];
        pokemonCry.src = data['cries']['latest'];
        entrada.value = '';
        searchPokemon = data.id;
    } else{

        alert("Desculpe Treinador Pokémon!!!\nAcho que errou o Nome ou Número do seu monstro de bolso");
        pokemonName.innerHTML = 'Erro 404 :( -';
        pokemonNumber.innerHTML = '';
        entrada.value = '';       
    }    
}

form.addEventListener('submit', (event) => {


    if(entrada.value > 493 || entrada.value < 0){
        alert("Essa Pokédex só vai até Sinnoh!!")

    }else{
        event.preventDefault();
        mostrarPokemon(entrada.value.toLowerCase());
    }     
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      mostrarPokemon(searchPokemon);
    }
});
  
  buttonNext.addEventListener('click', () => {
    
    if (searchPokemon >= 493) {
        alert("Essa Pokédex só vai até Sinnoh!!")

    }else{
        searchPokemon += 1;
        mostrarPokemon(searchPokemon);
    }
});
  
mostrarPokemon(searchPokemon);