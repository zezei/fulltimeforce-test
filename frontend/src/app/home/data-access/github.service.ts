import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  delay,
  EMPTY,
  filter,
  scan,
  switchMap,
  tap,
} from 'rxjs';

export interface Commit {
  message: string;
  id: string;
  author: string;
  date: Date;
}
@Injectable({ providedIn: 'root' })
export class GithubService {
  refresh$ = new BehaviorSubject<boolean>(false);
  isLoading$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  private resetStreamToDefaultValues() {
    this.refresh$.next(false);
    this.isLoading$.next(false);
  }
  getCommits() {
    return this.refresh$.pipe(
      filter((refresh) => !!refresh),
      tap(() => this.isLoading$.next(true)),
      delay(1000),
      switchMap(() =>
        this.http.get<Commit[]>('http://localhost:3000/github/commits').pipe(
          tap({
            next: () => {
              this.resetStreamToDefaultValues();
              console.log(this.refresh$.value);
            },
            error: (err) => {

              //TODO: Display toast error message
            console.log('error ', err)
              this.resetStreamToDefaultValues();
            },
          }),
          catchError(() => EMPTY),
        )
      )
    );
  }
}
