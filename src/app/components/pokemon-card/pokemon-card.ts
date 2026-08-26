import { Component, input } from '@angular/core';
import { PokemonEntity } from '../../models/pokemon.entity';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  pokemon = input<PokemonEntity>()
}