import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MoviesApiService} from '../services/movies-api.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Movie} from '../models/movie';
import { form, FormField, minLength, pattern, required, validate } from '@angular/forms/signals';

@Component({
  selector: 'app-update-movie',
  imports: [
    FormsModule,
    FormField,
    RouterLink
  ],
  templateUrl: './update-movie.html',
  styleUrl: './update-movie.scss',
})
export class UpdateMovie implements OnInit {
  private moviesApi = inject(MoviesApiService)
  private router = inject(Router)

  private route = inject(ActivatedRoute)

  readonly id = this.route.snapshot.paramMap.get('id');

  movie = signal<Movie>({
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  })

  releaseDateString = signal('');

  movieForm = form(this.movie, (res) => {
    required(res.title, { message: 'Title is required' });
    pattern(res.title, /^[A-ZÀ-Ÿ0-9\s\W]+$/, { message: 'Title must be full caps' });
    required(res.director, {message: 'Director is required'});
    pattern(res.director, /^[A-ZÀ-ÿ][a-zà-ÿ]+(?:\s[A-ZÀ-ÿ][a-zà-ÿ]+)+$/, {
      message: "Director should follow the pattern 'Firstname Lastname'",
    });
    required(res.releaseDate, {message: 'Release date is required'});
    validate(res.releaseDate, ({ value }) => {
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
    minLength(res.synopsis, 30, { message: 'Synopsis should be at least 30 characters long' });
  })

  ngOnInit(): void {
    const m = this.moviesApi.getMovie(this.id);
    m.subscribe(movie => {
      this.movie.set(movie);
      this.releaseDateString.set(new Date(movie.releaseDate).toISOString().slice(0, 10));
    });
  }

  onReleaseDateChange(value: string) {
    this.releaseDateString.set(value);
    this.movie.update(m => ({...m, releaseDate: new Date(value)}));
  }

  update(event: SubmitEvent) {
    event.preventDefault()

    this.moviesApi.updateMovie(this.movie()).subscribe(
      () => this.router.navigate(['/movies'])
    );
  }

  isValid() {
    return this.movieForm.title().valid() && this.movieForm.director().valid() && this.movieForm.releaseDate().valid() && this.movieForm.synopsis().valid()
  }
}
