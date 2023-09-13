import { useEffect, useState } from "react";
import Score from "./components/Score";
import Game from "./components/Game";

function App() {
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [pokemonFetchResult, setPokemonFetchResult] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState([]);

    const handleSelectPokemon = (pokemon) => {
        if (!selectedPokemon.includes(pokemon)) {
            setSelectedPokemon([...selectedPokemon, pokemon]);
            setScore(score + 1);
        } else {
            setSelectedPokemon([]);
            setBestScore(score);
            setScore(0);
        }
    };

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
            .then((result) => result.json())
            .then((json) => setPokemonFetchResult(json.results));
    }, []);

    return (
        <>
            <header className="flex items-center justify-between">
                <h1>Pokemon memory Game</h1>
                <Score score={score} bestScore={bestScore} />
            </header>
            <p>
                Get points by clicking on an image but don't click on any more
                than once!
            </p>
            <Game
                pokemonFetchResult={pokemonFetchResult}
                setScore={setScore}
                setBestScore={setBestScore}
                handleSelectPokemon={handleSelectPokemon}
            />
        </>
    );
}

export default App;
