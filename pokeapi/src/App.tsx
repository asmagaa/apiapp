import './App.css';
import { useState, useEffect, ChangeEvent } from 'react';

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  weight: number;
  height: number;
  abilities: PokemonAbility[];
}

function App() {
  const [pokemon, setPokemon] = useState<string>('');
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (!pokemon) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(res => res.json())
      .then(data => setPokemonData(data))
      .catch(err => console.error(err));
  }, [pokemon]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return ( // Dlaczego nie dziala??
    <>
      <h1>Pokemon</h1>
      <input
        id="pokemon"
        type='text'
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={() => setPokemon(inputValue)}>
        Znajdz pokemona
      </button>
      {pokemonData && (
        <>
          <img src={pokemonData.sprites.front_default} alt="pokemon" />
          <img src={pokemonData.sprites.front_shiny} alt="pokemon" /> <br />
          Waga: {pokemonData.weight} <br />
          Wzrost: {pokemonData.height} <br />
          {pokemonData.abilities.map(items => (
            <li key={items.ability.name}>{items.ability.name}</li>
          ))}
        </>
      )}
    </>
  );
}

export default App;