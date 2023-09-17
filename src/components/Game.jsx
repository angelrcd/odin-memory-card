import { useEffect, useState } from "react";
import Card from "./Card";

export default function Game({ pokemonFetchResult, handleSelectPokemon }) {
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
            })
            .catch((err) => console.error(err))
            .finally(() => setImagesLoaded(true));
    }, [pokemonFetchResult]);

    if (!imagesLoaded || pokemonFetchResult.length === 0) {
        return <p>Loading...</p>;
    } else {
        pokemonList = shuffleArray(pokemonFetchResult);
    }

    return (
        <main className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {pokemonList.map((pokemon) => (
                <Card
                    key={pokemon.name}
                    pokemon={pokemon}
                    selectPokemon={() => handleSelectPokemon(pokemon.name)}
                    image={images[pokemon.name]}
                />
            ))}
        </main>
    );
}

function shuffleArray(array) {
    const newArray = [...array]; // Create a copy of the original array

    for (let i = newArray.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i (inclusive)
        const j = Math.floor(Math.random() * (i + 1));

        // Swap the elements at i and j
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray; // Return the shuffled copy
}
