import { useEffect, useState } from "react";
import Card from "./Card";
import { PokemonGeneral, PokemonData, PokemonName } from "../types";

interface GameProps {
    pokemonFetchResult: PokemonGeneral[];
    handleSelectPokemon: (a: PokemonName) => void;
}

type PokemonImages = Record<PokemonName, HTMLImageElement>;

export default function Game({ pokemonFetchResult, handleSelectPokemon }: GameProps) {
    const [images, setImages] = useState<PokemonImages>({});
    const [imagesLoaded, setImagesLoaded] = useState(false);
    let pokemonList: PokemonGeneral[];

    useEffect(() => {
        const imagesObject: PokemonImages = {};

        Promise.all(
            pokemonFetchResult.map((pokemonFetch) =>
                fetch(pokemonFetch.url).then((result) => result.json())
            )
        )
            .then((res: PokemonData[]) => {
                res.forEach((response) => {
                    const imageElement = new Image();
                    imageElement.src = response.sprites.front_default;
                    imagesObject[response.name] = imageElement;
                });
                setImages(imagesObject);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setImagesLoaded(true);
            });
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
                    pokemonName={pokemon.name}
                    image={images[pokemon.name]}
                    selectPokemon={() => {
                        handleSelectPokemon(pokemon.name);
                    }}
                />
            ))}
        </main>
    );
}

function shuffleArray<Type>(array: Type[]): Type[] {
    const newArray = [...array]; // Create a copy of the original array

    for (let i = newArray.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i (inclusive)
        const j = Math.floor(Math.random() * (i + 1));

        // Swap the elements at i and j
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray; // Return the shuffled copy
}
