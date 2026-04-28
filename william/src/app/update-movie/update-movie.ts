import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MoviesApiService} from '../services/movies-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '../models/movie';
import {form, FormField, required} from '@angular/forms/signals';

@Component({
  selector: 'app-update-movie',
  imports: [
    FormsModule,
    FormField
  ],
  templateUrl: './update-movie.html',
  styleUrl: './update-movie.scss',
})
export class UpdateMovie implements OnInit{
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
    required(res.title, {message: 'Title is required'});
    required(res.director, {message: 'Director is required'});
    required(res.releaseDate, {message: 'Release date is required'});
    required(res.synopsis, {message: 'Synopsis is required'});
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
    this.movie.update(m => ({ ...m, releaseDate: new Date(value) }));
  }

  update(event: SubmitEvent) {
    event.preventDefault()

    this.moviesApi.updateMovie(this.movie()).subscribe(
      () => this.router.navigate(['/movies'])
    );
  }
}
