import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MoviesApiService} from '../services/movies-api.service';
import {ReviewApi} from '../services/review-api.service';
import {Movie} from '../models/movie';
import {Review} from '../models/review';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-details-movie',
  imports: [FormsModule, DatePipe],
  templateUrl: './details-movie.html',
  styleUrl: './details-movie.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsMovie implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly moviesApi = inject(MoviesApiService);
  private readonly reviewApi = inject(ReviewApi);
  private readonly userService: UserService = inject(UserService);

  readonly movieId = Number(this.route.snapshot.paramMap.get('id'));

  movie = signal<Movie | null>(null);
  reviews = signal<Review[]>([]);
  rate = signal<number>(5);
  text = signal('');

  ngOnInit(): void {
    if (!this.movieId) {
      return;
    }

    this.moviesApi.getMovie(String(this.movieId)).subscribe((movie) => {
      this.movie.set(movie);
    });

    this.reviewApi.getReviewsByMovie(this.movieId).subscribe((reviews) => {
      this.reviews.set(reviews);
    });
  }

  loadReviews(): void {
    this.reviewApi
      .getReviewsByMovie(this.movieId)
      .subscribe((reviews) => this.reviews.set(reviews));
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
    const user = this.userService.getUserfromLS();

    if (!movie || !movie.id || user === undefined) {
      return;
    }

    const review: Review = {
      movie,
      user: {
        id: user.id,
        firstName: '',
        lastName: '',
        age: 0,
        email: '',
        points: 0,
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
