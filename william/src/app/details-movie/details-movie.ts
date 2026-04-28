import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MoviesApiService} from '../services/movies-api.service';
import {ReviewApi} from '../services/review-api.service';
import {Movie} from '../models/movie';
import {Review} from '../models/review';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { UserService } from '../services/user-service';
import { User } from '../models/user';

@Component({
  selector: 'app-details-movie',
  imports: [FormsModule, DatePipe, ReactiveFormsModule],
  templateUrl: './details-movie.html',
  styleUrl: './details-movie.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsMovie implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly moviesApi = inject(MoviesApiService);
  private readonly reviewApi = inject(ReviewApi);
  private readonly userService: UserService = inject(UserService);

  private fb = inject(FormBuilder);

  readonly movieId = Number(this.route.snapshot.paramMap.get('id'));

  movie = signal<Movie | null>(null);
  reviews = signal<Review[]>([]);

  reviewForm = this.fb.group({
    rate: [5, [Validators.required, Validators.min(0), Validators.max(5)]],
    text: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
  });

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

  submitReview(): void {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const movie = this.movie();
    const user = this.userService.getUserfromLS();
    if (!movie || !user) return;

    const formValues = this.reviewForm.value;
    const userId = user?.user?.id ?? 0;

    const review: Review = {
      movie,
      user: { id: userId, firstName: '', lastName: '', age: 0, email: '', points: 0 },
      rate: formValues.rate!,
      text: formValues.text!,
      reviewDate: new Date(),
    };

    const newUser = {
      ...user.user,
      points: (user.user?.points ?? 0) + 1,
    }

    this.userService.postUser(newUser as User).subscribe();

    localStorage.setItem('user', JSON.stringify(newUser));

    this.reviewApi.addReview(review).subscribe(() => {
      this.reviewForm.reset({ rate: 5, text: '' });
      this.loadReviews();
    });
  }
}
