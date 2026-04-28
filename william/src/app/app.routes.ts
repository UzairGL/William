import { Routes } from '@angular/router';
import {MoviesList} from './movies-list/movies-list';
import {Home} from './home/home';
import {AddMovie} from './add-movie/add-movie';
import {UpdateMovie} from './update-movie/update-movie';
import {DetailsMovie} from './details-movie/details-movie';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'movies', component: MoviesList},
  { path: 'add-movie', component: AddMovie},
  { path: 'update-movie/:id', component: UpdateMovie},
  { path: 'movies/:id', component: DetailsMovie}
];

