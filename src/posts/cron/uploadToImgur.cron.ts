import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DBService } from '../db/db.service';
import { Post, Status } from '../interfaces/posts.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @Inject('INIT') private db: DBService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) { }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    this.logger.debug('Upload to imgur');

    const posts = await this.db.getIdle()
    if (posts.length == 0) {
      return
    }

    const client_id = this.configService.get('IMGUR_CLIENT_ID')
    const url = this.configService.get('IMGUR_API')

    const uploading = this.uploadImages(posts, url, client_id)
    const results = await Promise.allSettled(uploading)

    // Handle for thrown errors
    for (let i = 0; i < results.length; i++) {
      if (results[i].status == 'rejected') {
        console.log((results[i] as PromiseRejectedResult).status)
        console.log(JSON.stringify((results[i] as PromiseRejectedResult).reason))
        await this.db.update(posts[i].id, { status: Status.ERROR })
      }
    }
  }

  uploadImages(posts: Post[], url: string, client_id: string): Promise<void>[] {
    const uploading = posts.map(async post => {
      await this.db.update(post.id, { status: Status.UPLOADING })
      const formData = new FormData()
      formData.append('image', post.coverUrl)
      formData.append('type', 'url')

      const response = await firstValueFrom
        (this.httpService.post(`${url}/image`, formData, {
          headers: {
            Authorization: `Client-ID ${client_id}`
          }
        }))

      if (response.status >= 200) {
        await this.db.update(post.id, { imgurCoverUrl: response.data.data.link, status: Status.DONE })
      } else {
        await this.db.update(post.id, { status: Status.ERROR })
      }
    })

    return uploading
  }
}
