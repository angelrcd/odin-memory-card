import { useEffect, useState } from "react";
import Score from "./components/Score";
import Game from "./components/Game";

export default function App() {
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
            if (score > bestScore) {
                setBestScore(score);
            }
            setScore(0);
        }
    };

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
            .then((result) => result.json())
            .then((json) => {
                const random12Pokemon = getRandomElements(json.results, 12);
                setPokemonFetchResult(random12Pokemon);
            });
    }, []);

    return (
        <>
            <div className="mx-4 max-w-3xl sm:mx-8 md:mx-auto">
                <header className="flex items-center justify-between gap-4">
                    <h1>Pokemon memory Game</h1>
                    <Score score={score} bestScore={bestScore} />
                </header>
                <p>
                    Get points by clicking on an image but don&apos;t click on
                    any more than once!
                </p>
            </div>
            <div className="mx-4 mt-8 sm:mx-8">
                <Game
                    pokemonFetchResult={pokemonFetchResult}
                    handleSelectPokemon={handleSelectPokemon}
                />
            </div>
        </>
    );
}

function getRandomElements(array, n) {
    // Check if the number of elements to be returned is greater than the array length.
    if (n > array.length) {
        throw new Error(
            "The number of elements to be returned cannot be greater than the array length."
        );
    }

    // Create an empty array to store the random elements.
    let randomElements = [];

    // Create a set to store the already selected elements.
    const selectedElements = new Set();

    // Loop until we have 12 random elements.
    while (randomElements.length < n) {
        // Generate a random index.
        const randomIndex = Math.floor(Math.random() * array.length);

        // Check if the element at the random index has not been selected yet.
        if (!selectedElements.has(array[randomIndex])) {
            // Add the element to the random elements array and the selected elements set.
            randomElements.push(array[randomIndex]);
            selectedElements.add(array[randomIndex]);
        }
    }

    // Return the array of random elements.
    return randomElements;
}
