import { useEffect, useState } from "react";
import { range } from "lodash";
import { shuffleArray, populateUrls, fetcher } from "../helpers";
import CardSet from "./Components/CardSet/CardSet";
import Header from "./Components/Header/Header";
import LoadingIcon from "./Components/LoadingIcon/LoadingIcon";

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
      shuffleArray(pokemon, setPokemon);
    }
  }

  useEffect(() => {
    async function getPokemon() {
      const response = await fetcher(
        populateUrls("https://pokeapi.co/api/v2/pokemon/", 12)
      );
      setPokemon(response);
      setStatus("success");
    }
    getPokemon();
  }, [gameOver]);

  return (
    <>
      <Header
        title="Pokémon Memory Game"
        current={currentScore}
        best={bestScore}
      >
        Click on the Pokémon to get points, but do not click on the same one
        twice!
      </Header>
      {status === "loading" ? (
        <LoadingIcon photoSrc="./assets/pokeball.svg" />
      ) : (
        <CardSet set={pokemon} handleScoreChange={handleClick} />
      )}
    </>
  );
}

export default Game;
