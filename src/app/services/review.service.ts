import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { catchError, Observable } from 'rxjs';
import { Review } from 'src/app/models/review/review';
import { CreateReview } from 'src/app/models/review/create-review';
import { ReviewQueryParams } from '../models/review/review-query-params';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private url = environment.url + '/api/review';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getReviews(
    profileId: number,
    params: ReviewQueryParams
  ): Observable<Review[]> {
    const url = `${this.url}/${profileId}`;
    let httpParams = new HttpParams().set('PageSize', 6);

    if (params.pageNumber) {
      httpParams = httpParams.set('PageNumber', params.pageNumber);
    } else {
      httpParams = httpParams.set('PageNumber', 1);
    }

    const options = {
      params: httpParams,
    };

    return this.http
      .get<Review[]>(url, options)
      .pipe(catchError(this.errorHandler.handleError<Review[]>()));
  }

  createReview(profileId: number, review: CreateReview): Observable<Review> {
    return this.http
      .post<Review>(`${this.url}/${profileId}`, review, this.httpOptions)
      .pipe(catchError(this.errorHandler.handleError<Review>()));
  }

  deleteReview(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http
      .delete<void>(url)
      .pipe(catchError(this.errorHandler.handleError<void>()));
  }
}
