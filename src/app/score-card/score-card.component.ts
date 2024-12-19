import { Component, Input } from '@angular/core';
import { PokemonDataService } from '../pokemon-data.service';

@Component({
  selector: 'app-score-card',
  imports: [],
  templateUrl: './score-card.component.html',
  styleUrl: './score-card.component.scss'
})
export class ScoreCardComponent {

  @Input() score: Number = 0
  highScore: Number = 0;

  ngOnChanges() {

    if (this.score > this.highScore) {
      this.highScore = this.score
    }
  }

}
