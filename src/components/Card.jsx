export default function Card({ pokemon, handleSelectPokemon, image }) {
    return (
        <button
            className="rounded-lg bg-slate-400 p-4"
            onClick={() => handleSelectPokemon(pokemon.name)}>
            <img className="mx-auto" src={image?.src} alt={pokemon.name} />
            <span>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</span>
        </button>
    );
}
