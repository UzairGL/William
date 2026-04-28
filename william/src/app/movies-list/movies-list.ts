import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {MoviesApiService} from '../services/movies-api.service';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Movie} from '../models/movie';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ToastService} from '../services/toast.service';

@Component({
  selector: 'app-movies-list',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.scss',
})
export class MoviesList implements OnInit {
  private readonly moviesApi = inject(MoviesApiService)
  movies = this.moviesApi.movies
  service = inject(ToastService)

  private destroyRef = inject(DestroyRef)

  deleteMovie(id: number | undefined): void {
    if (!id) {
      return;
    }

    this.moviesApi.deleteMovie(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.movies.set(this.movies().filter((m: Movie) => m.id !== id));
      this.service.show('Le film a été supprimé.', 'danger');
    });
  }

  ngOnInit(): void {
    this.moviesApi.getMovies().subscribe()
  }
}
