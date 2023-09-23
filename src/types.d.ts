/// <reference types="vite/client" />

export interface PokemonGeneral {
    name: PokemonName;
    url: PokemonFetchURL;
}

export interface PokemonData {
    name: PokemonName;
    sprites: {
        front_default: string;
    };
}

export type PokemonName = string;
export type PokemonFetchURL = string;

export type Generation = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
