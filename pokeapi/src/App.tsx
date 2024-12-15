import './App.css';
import React, { useState, useEffect } from 'react';

interface PokemonData {
  name: string;
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

  return (
    <>
      <h1>Pokemon</h1>
      <input
        id="pokemon"
        type='text'
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      />
      <button onClick={() => setPokemon(inputValue)}>
        Search
      </button>
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          {}
        </div>
      )}
    </>
  );
}

export default App;