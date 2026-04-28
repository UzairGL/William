import { Component, Input } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {
  @Input({ required: true }) user!: User;
}
