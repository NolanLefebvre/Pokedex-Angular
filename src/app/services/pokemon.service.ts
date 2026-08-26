import {Injectable, inject } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {map, Observable } from 'rxjs';
import {PokemonEntity, PokemonListResponse } from '../models/pokemon.entity';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient)
  private baseUrl = 'https://pokeapi.co/api/v2'
  private spriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

  getPokemonList(limit = 20): Observable<PokemonEntity[]> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}`).pipe(
      map((response) =>
        response.results.map((item) => {
          const id = this.extractIdFromUrl(item.url)
          return {
            id,
            name: item.name,
            imageUrl: `${this.spriteUrl}/${id}.png`,
          }}),
      ),)
    }

  private extractIdFromUrl(url: string): number {
    const segments = url.split('/').filter(Boolean)
    return Number(segments[segments.length - 1])
  }
}