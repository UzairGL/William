import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Movie} from '../models/movie';
import {toSignal} from '@angular/core/rxjs-interop';
import { User } from '../models/user';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly url = 'http://localhost:8080';

  movies = signal<Movie[]>([]);
  users = signal<User[]>([]);
  reviews = signal<Review[]>([]);

  getMovies(): Observable<Movie[]> {
    return this.httpClient
      .get<Movie[]>(`${this.url}/movies`)
      .pipe(tap((m: Movie[]) => this.movies.set(m)));
  }

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(`${this.url}/users`)
      .pipe(tap((m: User[]) => this.users.set(m)));
  }

  getReviews(): Observable<Review[]> {
    return this.httpClient
      .get<Review[]>(`${this.url}/reviews`)
      .pipe(tap((m: Review[]) => this.reviews.set(m)));
  }

  getMovie(id: string | null): Observable<Movie> {
    if (!id) {
      return new Observable<Movie>();
    }
    return this.httpClient.get<Movie>(`${this.url}/movies/${id}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.httpClient
      .post<Movie>(`${this.url}/movies`, movie)
      .pipe(tap((m: Movie) => this.movies.set([...this.movies(), m])));
  }

  deleteMovie(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/movies/${id}`);
  }

  updateMovie(movie: Movie) {
    return this.httpClient
      .put<Movie>(`${this.url}/movies/${movie.id}`, movie)
      .pipe(
        tap((m: Movie) =>
          this.movies.update((list) => list.map((movie) => (movie.id === movie.id ? m : movie))),
        ),
      );
  }
}
