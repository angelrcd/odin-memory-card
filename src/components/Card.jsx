import { useEffect, useState } from "react";

export default function Card({ pokemon, handleSelectPokemon }) {
    const [image, setImage] = useState("/");

    useEffect(() => {
        fetch(pokemon.url)
            .then((result) => result.json())
            .then((json) => setImage(json.sprites.front_default));
    });

    return (
        <button
            className="rounded-lg bg-slate-400 p-4"
            onClick={() => handleSelectPokemon(pokemon.name)}>
            <img className="mx-auto" src={image} alt={pokemon.name} />
            <span>{pokemon.name}</span>
        </button>
    );
}
