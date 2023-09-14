import { useEffect, useState } from "react";
import Score from "./components/Score";
import Game from "./components/Game";

export default function App() {
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [generation, setGeneration] = useState("1");
    const [pokemonFetchResult, setPokemonFetchResult] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState([]);

    let url;
    switch (generation) {
        case "1":
            url = "https://pokeapi.co/api/v2/pokemon?limit=151";
            break;
        case "2":
            url = "https://pokeapi.co/api/v2/pokemon?offset=151&limit=100";
            break;
        case "3":
            url = "https://pokeapi.co/api/v2/pokemon?offset=251&limit=135";
            break;
        case "4":
            url = "https://pokeapi.co/api/v2/pokemon?offset=386&limit=107";
            break;
        case "5":
            url = "https://pokeapi.co/api/v2/pokemon?offset=493&limit=156";
            break;
        case "6":
            url = "https://pokeapi.co/api/v2/pokemon?offset=649&limit=72";
            break;
        case "7":
            url = "https://pokeapi.co/api/v2/pokemon?offset=721&limit=88";
            break;
        case "8":
            url = "https://pokeapi.co/api/v2/pokemon?offset=809&limit=96";
            break;
        case "9":
            url = "https://pokeapi.co/api/v2/pokemon?offset=905&limit=100";
            break;
    }

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

    const handleGenerationChange = (generation) => {
        setScore(0);
        setBestScore(0);
        setGeneration(generation);
    };

    useEffect(() => {
        fetch(url)
            .then((result) => result.json())
            .then((json) => {
                const random12Pokemon = getRandomElements(json.results, 12);
                setPokemonFetchResult(random12Pokemon);
            });
    }, [url]);

    return (
        <>
            <div className="mx-4 max-w-3xl sm:mx-8 md:mx-auto">
                <header className="flex items-center justify-between gap-4">
                    <h1>Pokemon memory Game</h1>
                    <Score score={score} bestScore={bestScore} />
                </header>
                <label className="mr-3" htmlFor="pet-select">
                    Choose a generation:
                </label>
                <select
                    name="pets"
                    value={generation}
                    onChange={(e) => handleGenerationChange(e.target.value)}
                    id="pet-select">
                    <option value="1">1st Gen</option>
                    <option value="2">2nd Gen</option>
                    <option value="3">3rd Gen</option>
                    <option value="4">4th Gen</option>
                    <option value="5">5th Gen</option>
                    <option value="6">6th Gen</option>
                    <option value="7">7th Gen</option>
                    <option value="8">8th Gen</option>
                    <option value="9">9th Gen</option>
                </select>
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
