import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MoviesApiService} from '../services/movies-api.service';
import {ReviewApi} from '../services/review-api.service';
import {Movie} from '../models/movie';
import {Review} from '../models/review';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-details-movie',
  imports: [FormsModule, DatePipe],
  templateUrl: './details-movie.html',
  styleUrl: './details-movie.scss',
})
export class DetailsMovie implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly moviesApi = inject(MoviesApiService);
  private readonly reviewApi = inject(ReviewApi);

  readonly movieId = Number(this.route.snapshot.paramMap.get('id'));

  movie = signal<Movie | null>(null);
  reviews = signal<Review[]>([]);
  userId = signal<number | null>(null);
  rate = signal<number>(5);
  text = signal('');
  reviewExists = signal(false);

  ngOnInit(): void {
    if (!this.movieId) {
      return;
    }

    this.moviesApi.getMovie(String(this.movieId)).subscribe(movie => {
      this.movie.set(movie);
    });

    this.reviewApi.getReviewsByMovie(this.movieId).subscribe(reviews => {
      this.reviews.set(reviews);
    });
  }

  loadReviews(): void {
    this.reviewApi.getReviewsByMovie(this.movieId).subscribe(reviews => this.reviews.set(reviews));
  }

  formatRate(rate: number | undefined | null): string {
    if (rate === null || rate === undefined) {
      return 'N/A';
    }

    return rate.toFixed(2);
  }

  submitReview(event: SubmitEvent): void {
    event.preventDefault();

    const movie = this.movie();
    const userId = this.userId();

    if (!movie || !movie.id || userId === null) {
      return;
    }

    const review: Review = {
      movie,
      user: {
        id: userId,
        firstName: '',
        lastName: '',
        age: 0,
        email: '',
      },
      rate: this.rate(),
      text: this.text(),
      reviewDate: new Date(),
    };

    this.reviewApi.addReview(review).subscribe(() => {
      this.text.set('');
      this.rate.set(5);
      this.loadReviews();
    });
  }
}
