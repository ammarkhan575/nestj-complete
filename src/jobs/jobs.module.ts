import { Module } from '@nestjs/common';
import { JobsController } from './controllers/jobs.controller';
import { JobsService } from './services/jobs.service';
import { RecentSearchService } from './services/recent-search.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [JobsController],
  providers: [JobsService, RecentSearchService]
})
export class JobsModule {}
