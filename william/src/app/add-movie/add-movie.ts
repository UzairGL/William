import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Movie} from '../models/movie';
import {MoviesApiService} from '../services/movies-api.service';
import {RouterLink, Router} from '@angular/router';
import {minLength, pattern, validate, form, FormField, required} from '@angular/forms/signals';
import {ToastService, ToastType} from '../services/toast.service';

@Component({
  selector: 'app-add-movie',
  imports: [FormsModule, FormField, RouterLink],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMovie {
  private moviesApi = inject(MoviesApiService);
  private router = inject(Router);
  private service = inject(ToastService)

  movie = signal<Movie>({
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined,
  });

  movieForm = form(this.movie, (res) => {
    required(res.title, {message: 'Title is required'});
    pattern(res.title, /^[A-ZÀ-Ÿ0-9\s\W]+$/, {message: 'Title must be full caps'});
    required(res.director, {message: 'Director is required'});
    pattern(res.director, /^[A-ZÀ-ÿ][a-zà-ÿ]+(?:\s[A-ZÀ-ÿ][a-zà-ÿ]+)+$/, {message: 'Director should follow the pattern \'Firstname Lastname\''})
    required(res.releaseDate, {message: 'Release date is required'});
    validate(res.releaseDate, ({value}) => {
      const releaseYear = value();
      if (releaseYear > new Date()) {
        return {
          kind: 'error',
          message: 'Release date must be in the past',
        };
      }
      return null;
    });

    required(res.synopsis, {message: 'Synopsis is required'});
    minLength(res.synopsis, 30, {message: 'Synopsis should be at least 30 characters long'});
  });

  addMovie(event: SubmitEvent) {
    event.preventDefault();

    this.moviesApi.addMovie(this.movie()).subscribe(
      async () => {
        this.service.show("Nouveau Film ajouté", ToastType.ADD);
        await this.router.navigate(['/movies'])
      }
    );
  }

  isValid() {
    return (
      this.movieForm.title().valid() &&
      this.movieForm.director().valid() &&
      this.movieForm.releaseDate().valid() &&
      this.movieForm.synopsis().valid()
    );
  }
}
