import { Injectable, inject } from '@angular/core';
import {catchError, EMPTY, Observable, of} from 'rxjs';
import { Generation } from '../models/generation';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import {PokemonDetails} from "../models/pokemon-details";

const apiBaseUrl = 'https://tt-pj-sample-api.azurewebsites.net/';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly httpClient = inject(HttpClient);

  getGenerations(): Observable<Generation[]> {
    return this.httpClient.get<Generation[]>(`${apiBaseUrl}generations`);
  }

  getPokemonCollection(gen: number = 1): Observable<Pokemon[]> {
    return this.httpClient.get<Pokemon[]>(`${apiBaseUrl}generations/${gen}/pokemon`).pipe(
      catchError(err => {
        console.error(err);
        return [];
      })
    );
  }

  getPokemon(id: number): Observable<PokemonDetails> {
    return this.httpClient.get<PokemonDetails>(`${apiBaseUrl}pokemon/${id}`).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY;
      })
    );
  }
}
