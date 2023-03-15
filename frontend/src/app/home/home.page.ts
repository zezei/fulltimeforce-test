import { Component } from '@angular/core';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Commit, GithubService } from './data-access/github.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  githubCommits$: Observable<Commit[]> = this.githubService.getCommits();

  vm$ = combineLatest([this.githubService.getCommits().pipe(startWith([])), this.githubService.isLoading$.pipe(startWith(false))]).pipe(
    map(([commits, isLoading])=>({commits, isLoading}))
  )
  constructor(private githubService: GithubService) {}

  loadCommits(){
    this.githubService.refresh$.next(true)
  }

}
