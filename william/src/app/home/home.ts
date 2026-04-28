import {Component, inject, OnInit} from '@angular/core';
import {MoviesApiService} from '../services/movies-api.service';
import {MovieCard} from './movie-card/movie-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private readonly moviesApi = inject(MoviesApiService);
  movies = this.moviesApi.movies;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.moviesApi.getMovies().subscribe();
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
  }
}
