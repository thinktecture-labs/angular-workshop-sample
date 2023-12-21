import {Component, inject, signal} from '@angular/core';
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {MatTabsModule} from "@angular/material/tabs";
import {map, switchMap} from "rxjs";
import {Pokemon} from "./models/pokemon";
import {PokemonService} from './services/pokemon.service';
import {AsyncPipe, NgFor, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'ps-pokemon-collection',
  standalone: true,
  imports: [NgIf, NgFor,NgOptimizedImage, AsyncPipe, MatTabsModule],
  templateUrl: './pokemon-collection.component.html',
  styleUrl: './pokemon-collection.component.scss'
})
export class PokemonCollectionComponent {
  private readonly pokemonService = inject(PokemonService);
  readonly generationId = signal<number>(1);
  private readonly pokemonCollection$ = toObservable(this.generationId).pipe(
    switchMap(genId => this.pokemonService.getPokemonCollection(genId))
  );

  readonly pokemonCollection = toSignal<Pokemon[]>(this.pokemonCollection$);
  readonly generation$ = this.pokemonService.getGenerations();

}
