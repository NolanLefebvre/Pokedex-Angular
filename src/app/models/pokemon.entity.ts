export interface PokemonEntity {
  id: number;
  name: string;
  imageUrl: string;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: PokemonListItem[];
}