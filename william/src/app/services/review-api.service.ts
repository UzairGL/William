import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Review} from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewApi {
  private readonly httpClient = inject(HttpClient)
  private readonly url = "http://localhost:8080/reviews"

  reviews = signal<Review[]>([])

  // -- PATH -- /reviews/
  getReviews(): Observable<Review[]> {
    return this.httpClient.get<Review[]>(this.url).pipe(tap((r: Review[]) => this.reviews.set(r)))
  }

  addReview(review: Review): Observable<Review> {
    return this.httpClient.post<Review>(this.url, review).pipe(tap((r: Review) => this.reviews.set([...this.reviews(), r])))
  }

  // -- PATH -- /reviews/{id}
  getReview(id: string | null): Observable<Review> {
    if (!id){
      return new Observable<Review>()
    }
    return this.httpClient.get<Review>(`${this.url}/${id}`)
  }

  deleteReview(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

  updateReview(review: Review) {
    return this.httpClient.put<Review>(`${this.url}/${review.id}`, review).pipe(tap((r: Review) =>
      this.reviews.update(list =>
        list.map(review =>
          review.id === review.id ? r : review))))
  }

  // -- PATH -- /reviews/findAllYears
  getAllYears(): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.url}/findAllYears`)
  }

  // -- PATH -- /reviews/checkAvis
  /**
   * Check if a review of a user exist for a movie
   */
  getCheckAvis(movieId: number, userId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('filmId', movieId.toString())
      .set('userId', userId.toString());

    return this.httpClient.get<boolean>(`${this.url}/checkAvis`, { params })
  }

  // -- PATH -- /reviews/byYear/{year}
  getReviewsByYear(year: number): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${this.url}/byYear/${year}`)
  }

  // -- PATH -- /reviews/byYear/{year}/quantity/
  getReviewsByYearQuantity(year: number): Observable<number> {
    return this.httpClient.get<number>(`${this.url}/byYear/${year}/quantity/`)
  }

  // -- PATH -- /movies/{movieId}/reviews
  getReviewsByMovie(movieId: number): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`http://localhost:8080/movies/${movieId}/reviews`)
  }
}
