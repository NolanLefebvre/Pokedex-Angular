export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: PokemonListItem[];
}

export interface PokemonCard {
  id: number;
  name: string;
  imageUrl: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: { name: string };
  }[];
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
}