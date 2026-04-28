import { Routes } from '@angular/router';
import {MoviesList} from './movies-list/movies-list';
import {Home} from './home/home';
import {AddMovie} from './add-movie/add-movie';
import {UpdateMovie} from './update-movie/update-movie';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login/login.component';
import {DetailsMovie} from './details-movie/details-movie';
import {AdminPanel} from './admin-panel/admin-panel';
import {AdminUsers} from './admin-panel/admin-users/admin-users';
import {AdminReviews} from './admin-panel/admin-reviews/admin-reviews';
import {AdminStats} from './admin-panel/admin-stats/admin-stats';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movies', component: MoviesList},
  { path: 'add-movie', component: AddMovie},
  { path: 'update-movie/:id', component: UpdateMovie},
  { path: 'movies/:id', component: DetailsMovie},
  { path: 'profile', component: ProfileComponent },
  { path: 'movies/:id', component: DetailsMovie},
  {
    path: 'admin',
    component: AdminPanel,
    children: [
      { path: 'users', component: AdminUsers },
      { path: 'reviews', component: AdminReviews},
      { path: '', component: AdminStats}
    ],
  },
];

