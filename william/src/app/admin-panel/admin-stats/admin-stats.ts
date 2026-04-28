import { Component, inject, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api.service';

@Component({
  selector: 'app-admin-stats',
  imports: [],
  templateUrl: './admin-stats.html',
  styleUrl: './admin-stats.scss',
})
export class AdminStats implements OnInit {
  private readonly moviesApi = inject(MoviesApiService);
  movies = this.moviesApi.movies;
  users = this.moviesApi.users;
  reviews = this.moviesApi.reviews;

  ngOnInit(): void {
    this.moviesApi.getMovies().subscribe();
    this.moviesApi.getUsers().subscribe();
    this.moviesApi.getReviews().subscribe();
  }
}
