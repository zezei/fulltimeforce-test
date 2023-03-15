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
import { GuiService } from 'src/app/shared/services/gui.service';

export interface Commit {
  message: string;
  id: string;
  author: string;
  date: Date;
}
@Injectable({ providedIn: 'root' })
export class GithubService {
  private refresh$ = new BehaviorSubject<boolean>(false);
  private isLoading$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private guiService: GuiService) {}

  private resetStreamToDefaultValues() {
    this.refresh$.next(false);
    this.isLoading$.next(false);
  }

  refresh(){
    this.refresh$.next(true);
  }
  getCommits() {
    return this.refresh$.pipe(
      filter((refresh) => !!refresh),
      tap(() => this.isLoading$.next(true)),
      delay(1000), //TODO: Remove for production
      switchMap(() =>
        this.http.get<Commit[]>('http://localhost:3000/github/commits').pipe(
          tap({
            next: () => {
              this.resetStreamToDefaultValues();
              console.log(this.refresh$.value);
            },
            error: (err) => {
              //TODO: Display toast error message
              console.log('error ', err);
              this.guiService.alertToast(err.error.message, 2500);
              this.resetStreamToDefaultValues();
            },
          }),
          //This will avoid stream from braking
          catchError(() => EMPTY)
        )
      )
    );
  }

  getLoadingStatus(){
    return this.isLoading$.asObservable();
  }
}
