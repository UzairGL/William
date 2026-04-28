import { Component, inject, signal, Signal } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user-service';
import { DataUser } from '../models/dataUser';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private readonly userService: UserService = inject(UserService);

  public user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    points: 0,
    age: 0,
  }

  public userSignal = signal<User>(this.user);

  constructor() {
    const data: DataUser = this.userService.getUserfromLS();
    if (data.error) {
      throw new DOMException();
    }
    if (data.user) {
      this.user = data.user;
      this.userSignal = signal<User>(this.user);
    }
  }
}
