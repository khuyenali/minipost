import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

import { DBModule } from './db/db.module';
import { DBService } from './db/db.service';

const initDB = {
  provide: 'INIT',
  useFactory: async (dbService: DBService) => {
    await dbService.init()
    return dbService
  },
  inject: [DBService],
};

@Module({
  imports: [DBModule],
  controllers: [PostsController],
  providers: [PostsService, initDB],
})
export class PostsModule { }
