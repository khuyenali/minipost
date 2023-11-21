import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PostsModule,
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
