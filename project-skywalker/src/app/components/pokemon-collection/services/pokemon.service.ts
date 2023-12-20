import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Generation } from '../models/generation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly httpClient = inject(HttpClient);
  getGenerations(): Observable<Generation[]> {
    return this.httpClient.get<Generation[]>('https://tt-pj-sample-api.azurewebsites.net/generations');
  }
}
