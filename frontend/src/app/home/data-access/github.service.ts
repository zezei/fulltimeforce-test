import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Commit {
  message: string;
  id: string;
  author: string;
  date: Date;
}
@Injectable({ providedIn: 'root' })
export class GithubService {
  constructor(private http: HttpClient) {}

  getCommits() {
    return this.http.get<Commit[]>('http://localhost:3000/github/commits');
  }
}
