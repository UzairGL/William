import {Component, inject, OnInit} from '@angular/core';
import {MoviesApiService} from '../services/movies-api.service';
import {MovieCard} from './movie-card/movie-card';

@Component({
  selector: 'app-home',
  imports: [
    MovieCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private readonly moviesApi = inject(MoviesApiService)
  movies = this.moviesApi.movies;

  ngOnInit(): void {
    this.moviesApi.getMovies().subscribe()
  }
}
