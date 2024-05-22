import { useEffect, useState } from "react";
import "../styles/game.css";
import { range } from "lodash";

function populateUrls() {
  const int = Math.floor(Math.random() * 80) + 1;
  const ints = range(12).map((item, index) => (index + 1) * int);
  const nextPokemonUrls = range(12).map((item, index) => {
    return `https://pokeapi.co/api/v2/pokemon/${ints[index]}/`;
  });
  return nextPokemonUrls;
}

async function fetcher(urls) {
  const response = await Promise.all(
    urls.map(async (url) => {
      const result = await fetch(url);
      return await result.json();
    })
  );
  return response;
}

function Game() {
  const [status, setStatus] = useState("loading");
  const [pokemon, setPokemon] = useState(() => range(12));
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clicked, setClicked] = useState([]);
  const [gameOver, setgameOver] = useState(false);

  function handleScoreChange() {
    const nextScore = currentScore + 1;
    setCurrentScore(nextScore);
    if (currentScore === bestScore) {
      setBestScore(nextScore);
    }
  }

  function shufflePokemon() {
    const nextPokemon = pokemon;
    nextPokemon.sort(() => Math.random() - 0.5);
    setPokemon(nextPokemon);
  }

  function changeClicked(name) {
    const nextClicked = clicked;
    nextClicked.push(name);
    setClicked(nextClicked);
  }

  function handleClick(name) {
    if (clicked.includes(name) || currentScore === 12) {
      setgameOver(!gameOver);
      setCurrentScore(0);
      setClicked(Array(12).fill(false));
    } else {
      handleScoreChange();
      changeClicked(name);
      shufflePokemon();
    }
  }

  useEffect(() => {
    async function getPokemon() {
      const response = await fetcher(populateUrls());
      setPokemon(response);
      setStatus("success");
    }
    getPokemon();
  }, [gameOver]);

  return (
    <div>
      <div className="game__header">
        <Header />
        <ScoreBoard current={currentScore} best={bestScore} />
      </div>
      {status === "loading" ? (
        <div className="loading__container">
          <img className="loading__star" src="./assets/pokeball.png" />
        </div>
      ) : (
        <CardSet pokemon={pokemon} handleScoreChange={handleClick} />
      )}
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1 className="game__header--title">Pokémon Memory Game</h1>
      <p>
        Click on the Pokémon to get points, but do not click on the same one
        twice!
      </p>
    </div>
  );
}

function ScoreBoard({ current, best }) {
  return (
    <div className="game__score">
      <h2>
        Score: <span className="game__score--num">{current}</span>
      </h2>
      <h2>
        Best Score: <span className="game__score--num">{best}</span>
      </h2>
    </div>
  );
}

function Card({ img, name, handleScoreChange }) {
  return (
    <div className="game__board--card" onClick={handleScoreChange}>
      <img src={img} alt="" className="game__board--card--img" />
      <p className="game__board--card--name">{name}</p>
    </div>
  );
}

function CardSet({ pokemon, handleScoreChange }) {
  return (
    <div className="game__board">
      {pokemon?.map((poke, index) => (
        <Card
          name={poke?.name}
          img={poke?.sprites.front_default}
          key={index}
          handleScoreChange={() => handleScoreChange(poke?.name)}
        />
      ))}
    </div>
  );
}

export default Game;
