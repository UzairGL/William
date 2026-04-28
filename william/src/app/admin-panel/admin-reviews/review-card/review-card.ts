import { Component, Input } from '@angular/core';
import { Review } from '../../../models/review';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-review-card',
  imports: [DatePipe],
  templateUrl: './review-card.html',
  styleUrl: './review-card.scss',
})
export class ReviewCard {
  @Input({ required: true }) review!: Review;
}
