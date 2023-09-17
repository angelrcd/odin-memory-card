export default function Card({ pokemon, selectPokemon, image }) {
    return (
        <button
            className="rounded-lg bg-slate-400 p-4 font-[PressStart2P] outline-none transition-transform hover:scale-110"
            onClick={selectPokemon}>
            <img className="mx-auto" src={image?.src} alt={pokemon.name} />
            <span>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</span>
        </button>
    );
}
