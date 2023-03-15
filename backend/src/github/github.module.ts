import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [GithubController],
  providers: [GithubService],
  imports: [ConfigModule, HttpModule]
})
export class GithubModule {}
