import { Component, inject, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api.service';
import { UserCard } from '../admin-users/user-card/user-card';
import { ReviewCard } from './review-card/review-card';

@Component({
  selector: 'app-admin-reviews',
  imports: [ReviewCard],
  templateUrl: './admin-reviews.html',
  styleUrl: './admin-reviews.scss',
})
export class AdminReviews implements OnInit {
  private readonly moviesApi = inject(MoviesApiService);
  reviews = this.moviesApi.reviews;

  ngOnInit(): void {
    this.moviesApi.getReviews().subscribe();
  }
}
