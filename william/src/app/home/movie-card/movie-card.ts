import {Component, inject, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  router = inject(Router)

  async onMovieClick() {
    await this.router.navigate([`/movies/${this.movie.id}`]);
  }

  formatRate(rate: number | undefined | null): string {
    if (rate === null || rate === undefined) {
      return 'N/A';
    }

    return rate.toFixed(2);
  }

  @Input({required: true}) movie!: any;
}
