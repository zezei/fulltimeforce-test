import { HttpService } from '@nestjs/axios/dist';
import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs/operators';
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
    /*Note: this can be refactor and move the logic inside a
    try catch and then use a DTO to seralize the response
    But for this simple API, i think RXJS make it simpler for this case
    */
    return this.httpService.get(this.COMMITS_URL).pipe(
      //Throw exception in case of error -> try refresh >60 times and will fail
      catchError((err) => {
        throw new HttpException(
          err.response?.data?.message || 'Contact the server admin',
          err?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
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
