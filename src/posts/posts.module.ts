import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

import { DBModule } from './db/db.module';
import { DBService } from './db/db.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './cron/uploadToImgur.cron';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

const InitDB = {
  provide: 'INIT',
  useFactory: async (dbService: DBService) => {
    await dbService.init()
    return dbService
  },
  inject: [DBService],
};

@Module({
  imports: [DBModule, ScheduleModule.forRoot(), ConfigModule, HttpModule],
  controllers: [PostsController],
  providers: [PostsService, TasksService, InitDB],
})
export class PostsModule { }
