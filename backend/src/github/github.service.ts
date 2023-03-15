import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
export interface Committer {
  name: string;
  email: string;
  date: Date;
}
export interface Commit {
  message: string;
  url: string;
  comment_count: number;
  committer: Committer;

}
export interface GitHubResponse {
  sha: string;
  node_id: string;
  commit: Commit;
}
@Injectable()
export class GithubService {
  COMMITS_URL = this.configService.get<string>('GITHUB_ENDPOINT');
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  fetchCommits() {
    return this.httpService.get(this.COMMITS_URL).pipe(
      //Get the data from the body
      map((response) => response['data']),
      //Map the response
      map((githubResponse: GitHubResponse[]) =>
        githubResponse.map((res) => ({
          message: res.commit.message,
          id: res.sha,
          author: res.commit.committer.email,
          date: res.commit.committer.date,
        })),
      ),
    );
  }
}
