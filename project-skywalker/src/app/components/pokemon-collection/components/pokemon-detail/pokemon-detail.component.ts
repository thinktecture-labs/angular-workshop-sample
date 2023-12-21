import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {filter, switchMap} from "rxjs";
import {PokemonService} from "../../services/pokemon.service";

@Component({
  selector: 'ps-pokemon-detail',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgOptimizedImage
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent {
  private readonly pokemonService = inject(PokemonService);
  private readonly activatedRoute = inject(ActivatedRoute);

  pokemon$ = this.activatedRoute.params.pipe(
    filter(params => 'id' in params),
    switchMap(({id}) => this.pokemonService.getPokemon(+id))
  );
}
