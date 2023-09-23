import { type PokemonName } from "../types";

interface CardProps {
    pokemonName: PokemonName;
    image: HTMLImageElement | null;
    selectPokemon: () => void;
}

export default function Card({ pokemonName, selectPokemon, image }: CardProps) {
    return (
        <button
            className="rounded-lg bg-slate-400 p-4 font-[PressStart2P] outline-none transition-transform hover:scale-110"
            onClick={selectPokemon}>
            <img className="mx-auto" src={image?.src} alt={pokemonName} />
            <span>{pokemonName[0].toUpperCase() + pokemonName.slice(1)}</span>
        </button>
    );
}
