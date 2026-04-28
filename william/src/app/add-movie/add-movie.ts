import {ChangeDetectionStrategy, Component, inject, OnChanges, OnInit, signal} from '@angular/core';
import {FormsModule, Validators} from '@angular/forms';
import {Movie} from '../models/movie';
import {MoviesApiService} from '../services/movies-api.service';
import {Router} from '@angular/router';
import {form, FormField, required} from '@angular/forms/signals';

@Component({
  selector: 'app-add-movie',
  imports: [
    FormsModule,
    FormField
  ],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMovie {
  private moviesApi = inject(MoviesApiService)
  private router = inject(Router)

  movie = signal<Movie>({
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  })

  movieForm = form(this.movie, (res) => {
    required(res.title, {message: 'Title is required'});
    required(res.director, {message: 'Director is required'});
    required(res.releaseDate, {message: 'Release date is required'});
    required(res.synopsis, {message: 'Synopsis is required'});
  })

  addMovie(event: SubmitEvent) {
    event.preventDefault()

    this.moviesApi.addMovie(this.movie()).subscribe(
      () => this.router.navigate(['/movies'])
    );
  }

  isValid() {
    return this.movieForm.title().valid() && this.movieForm.director().valid() && this.movieForm.releaseDate().valid() && this.movieForm.synopsis().valid()
  }
}
