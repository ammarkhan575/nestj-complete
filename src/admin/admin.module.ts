import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ConfigModule } from '@nestjs/config';
import ADMINDATABASE_CONFIG from './database.config';

@Module({
  imports: [
    ConfigModule.forFeature(ADMINDATABASE_CONFIG) // yha pe set kr rhe hain lkein kisi bhi module me use kr skte hain
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
