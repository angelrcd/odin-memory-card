export default function Card({ pokemon, handleSelectPokemon }) {
    return (
        <button onClick={() => handleSelectPokemon(pokemon.name)}>
            {pokemon.name}
        </button>
    );
}
