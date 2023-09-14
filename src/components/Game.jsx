import { useEffect, useState } from "react";
import Card from "./Card";

export default function Game({
    pokemonFetchResult,
    setScore,
    setBestScore,
    handleSelectPokemon,
}) {
    const [images, setImages] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    let pokemonList;

    useEffect(() => {
        const imagesObject = {};

        Promise.all(
            pokemonFetchResult.map((pokemonFetch) =>
                fetch(pokemonFetch.url).then((result) => result.json())
            )
        )
            .then((res) => {
                res.forEach((response) => {
                    const imageElement = new Image();
                    imageElement.src = response.sprites.front_default;
                    imagesObject[response.name] = imageElement;
                });
                setImages(imagesObject);
                setImagesLoaded(true);
            })
            .catch((err) => console.error(err));
    }, [pokemonFetchResult]);

    if (pokemonFetchResult.length === 0 || !imagesLoaded) {
        return <p>Loading...</p>;
    } else {
        pokemonList = getRandomElements(pokemonFetchResult, 12);
    }

    return (
        <main className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {pokemonList.map((pokemon) => (
                <Card
                    key={pokemon.name}
                    pokemon={pokemon}
                    handleSelectPokemon={handleSelectPokemon}
                    image={images[pokemon.name]}
                />
            ))}
        </main>
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
