import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  windows: Window | null = null;

  onMovieClick() {
    this.windows = window.open(`/movies/${this.movie.id}`, '_blank');
    if (this.windows) {
      this.windows.focus();
    }
  }
  @Input({ required: true }) movie!: any;
}
