import { Component, inject, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api.service';
import { UserCard } from './user-card/user-card';

@Component({
  selector: 'app-admin-users',
  imports: [UserCard],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss',
})
export class AdminUsers implements OnInit {
  private readonly moviesApi = inject(MoviesApiService);
  users = this.moviesApi.users;

  ngOnInit(): void {
    this.moviesApi.getUsers().subscribe();
  }
}
