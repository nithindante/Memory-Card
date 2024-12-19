import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon } from './pokemon';
@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  pok: Pokemon[] = []
  constructor(private http: HttpClient) { }

  getDetails(id: String): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${id}`)
  }

  getPokemonDetails(): Observable<any> {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
  }
}
