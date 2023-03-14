import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubService {

    COMMITS_URL = this.configService.get<string>('GITHUB_ENDPOINT')
    constructor(private configService: ConfigService) {}
    fetchCommits() { 
    return null;
  }
}
