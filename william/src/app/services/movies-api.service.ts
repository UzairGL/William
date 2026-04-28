import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Movie} from '../models/movie';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private readonly httpClient = inject(HttpClient)
  private readonly url = "http://localhost:8080/movies"

  movies = signal<Movie[]>([])

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.url).pipe(tap((m: Movie[]) => this.movies.set(m)))
  }

  getMovie(id: string | null): Observable<Movie> {
    if (!id){
      return new Observable<Movie>()
    }
    return this.httpClient.get<Movie>(`${this.url}/${id}`)
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.httpClient.post<Movie>(this.url, movie).pipe(tap((m: Movie) => this.movies.set([...this.movies(), m])))
  }

  deleteMovie(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

  updateMovie(movie: Movie) {
    return this.httpClient.put<Movie>(`${this.url}/${movie.id}`, movie).pipe(tap((m: Movie) =>
      this.movies.update(list =>
        list.map(movie =>
          movie.id === movie.id ? m : movie))))
  }
}
