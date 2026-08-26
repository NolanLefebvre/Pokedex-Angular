import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonEntity } from '../../models/pokemon.entity';
import { PokemonCard } from '../pokemon-card/pokemon-card';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard, FormsModule],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',})

export class PokemonList {
  private pokemonService = inject(PokemonService)
  allPokemons = signal<PokemonEntity[]>([])
  loading = signal(true)
  error = signal<string | null>(null)


  ngOnInit() {
    this.loading.set(true);
    this.pokemonService.getPokemonList(20).subscribe({
      next: (data) => {
        this.allPokemons.set(data)
        this.loading.set(false)
      },
      error: () => {
        this.error.set("Impossible de récupérer les Pokémon.")
        this.loading.set(false)
      },
    })
    }
}