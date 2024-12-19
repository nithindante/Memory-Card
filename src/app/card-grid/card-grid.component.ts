import { Component } from '@angular/core';
import { ScoreCardComponent } from "../score-card/score-card.component";
import { PokemonDataService } from '../pokemon-data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Pokemon } from '../pokemon';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-card-grid',
  imports: [ScoreCardComponent, CommonModule],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.scss'
})
export class CardGridComponent {
  currentScore: number = 0;

  newArr: Array<any> = []
  changeImages(item: any) {
    this.arr = []
    this.currentScore++;
    for (let i = 0; i < this.pokeUrlArr.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.pokeUrlArr[i], this.pokeUrlArr[j]] = [this.pokeUrlArr[j], this.pokeUrlArr[i]];
    }
    this.callPokemonUrls(this.pokeUrlArr)
    this.extractPokemon(item)
    this.newArr.push(item)
    this.checkMatch()
  }
  constructor(private service: PokemonDataService) { }
  pokemon: Pokemon[] = []
  pokeArr = []
  pokeUrlArr = []

  pokemonDetails: any[] = [];
  arr: Array<any> = []
  ngOnInit() {
    this.service.getPokemonDetails().subscribe((ele) => {
      this.pokeArr = ele['results']
    })

    this.pokeArr.forEach((pokemon) => {
      this.pokeUrlArr.push(pokemon['url'])
    })
    this.callPokemonUrls(this.pokeUrlArr)
  }
  private callPokemonUrls(pokeUrlArr: any) {
    let pokemonRequests = pokeUrlArr.map((url: any) => this.service.getDetails(url))
    forkJoin(pokemonRequests).subscribe((pokemons: any) => {
      this.pokemon = pokemons
      this.pokemon.forEach((pokemons: any) => {
        this.arr.push(pokemons.sprites.other.dream_world.front_default)
      }
      )
    })
  }

  private extractPokemon(item: any) {
    item = item.match(/\/(\d+)\.svg$/);
    if (item) {
      item = item[1]
    }
  }

  private checkMatch() {
    for (let i = 1; i < this.newArr.length; i++) {
      if (this.newArr[0] === this.newArr[i]) {
        this.currentScore = 0
        this.newArr = []
      }
    }
  }
}
