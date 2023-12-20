import { Component, inject } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'ps-pokemon-collection',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './pokemon-collection.component.html',
  styleUrl: './pokemon-collection.component.scss'
})
export class PokemonCollectionComponent {
  private readonly pokemonService = inject(PokemonService);

  readonly generation$ = this.pokemonService.getGenerations();
}
