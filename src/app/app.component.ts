import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardGridComponent } from "./card-grid/card-grid.component";
import { ScoreCardComponent } from "./score-card/score-card.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardGridComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Memory-Card';
}
