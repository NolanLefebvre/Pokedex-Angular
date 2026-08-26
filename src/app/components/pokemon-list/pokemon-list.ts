import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
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
  private sub = new Subscription()
  private search$ = new Subject<string>()
  allPokemons = signal<PokemonEntity[]>([])
  loading = signal(true)
  error = signal<string | null>(null)
  searchTerm = signal('')


  filteredPokemons = computed(() => {
    const term = this.searchTerm().toLowerCase()
    return this.allPokemons().filter((p) => p.name.toLowerCase().includes(term))
  });

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
    this.sub = this.search$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => this.searchTerm.set(term))
    }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }
  onSearchInput(value: string) {
    this.search$.next(value)
  }
}