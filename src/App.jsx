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
            <div className="mx-4 max-w-3xl sm:mx-8 md:mx-auto">
                <header className="flex items-center justify-between gap-4">
                    <h1>Pokemon memory Game</h1>
                    <Score score={score} bestScore={bestScore} />
                </header>
                <p>
                    Get points by clicking on an image but don't click on any
                    more than once!
                </p>
            </div>
            <div className="mx-4 mt-8 sm:mx-8">
                <Game
                    pokemonFetchResult={pokemonFetchResult}
                    setScore={setScore}
                    setBestScore={setBestScore}
                    handleSelectPokemon={handleSelectPokemon}
                />
            </div>
        </>
    );
}

export default App;
