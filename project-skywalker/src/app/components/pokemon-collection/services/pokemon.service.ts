import { Injectable, inject } from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import { Generation } from '../models/generation';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';

const apiBaseUrl = 'https://tt-pj-sample-api.azurewebsites.net/';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly httpClient = inject(HttpClient);

  getGenerations(): Observable<Generation[]> {
    return this.httpClient.get<Generation[]>(`${apiBaseUrl}generations`);
  }

  getPokemonCollection(gen: number = 1) {
    return this.httpClient.get<Pokemon[]>(`${apiBaseUrl}generations/${gen}/pokemon`).pipe(
      catchError(err => {
        console.error(err);
        return [];
      })
    );
  }
}
