import {Component, inject, signal} from '@angular/core';
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTabsModule} from "@angular/material/tabs";
import {Router} from "@angular/router";
import {ComponentStore} from "@ngrx/component-store";
import {finalize, map, Observable, switchMap, tap} from "rxjs";
import {Pokemon} from "./models/pokemon";
import {PokemonService} from './services/pokemon.service';
import {AsyncPipe, NgFor, NgIf, NgOptimizedImage} from '@angular/common';

interface PokemonCollectionState {
  loading:boolean;
  collection: Pokemon[];
  selectedPokemon?: number;
}

@Component({
  selector: 'ps-pokemon-collection',
  standalone: true,
  imports: [NgIf, NgFor, NgOptimizedImage, AsyncPipe, MatProgressBarModule, MatTabsModule],
  templateUrl: './pokemon-collection.component.html',
  styleUrl: './pokemon-collection.component.scss'
})
export class PokemonCollectionComponent extends ComponentStore<PokemonCollectionState> {
  private readonly pokemonService = inject(PokemonService);
  private readonly router = inject(Router);

  readonly loading = this.selectSignal(({loading}) => loading);
  readonly collection = this.selectSignal(({collection}) => collection);

  protected readonly selectGeneration = this.effect((genId$: Observable<number>)=>
    genId$.pipe(
      tap(() => this.patchState({loading: true})),
      switchMap(genId => this.pokemonService.getPokemonCollection(genId).pipe(
        tap(collection => this.patchState({collection})),
        finalize(() => this.patchState({loading: false}))
      ))
    )
  );

  readonly generation$ = this.pokemonService.getGenerations();

  openDetails(id: number): void {
    this.router.navigate([`pokemon/${id}`]);
  }

  constructor() {
    super({loading: false, collection: []});
  }
}
