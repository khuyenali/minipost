import { Inject, Injectable } from '@nestjs/common';
import { Post, Status } from './interfaces/posts.interface';
import { DBService } from './db/db.service';

@Injectable()
export class PostsService {
  constructor(@Inject('INIT') private db: DBService) { }

  async create(url: string) {
    await this.db.create({
      id: 0,
      coverUrl: url,
      imgurCoverUrl: "",
      status: Status.IDLE,
    })

    return 'created'
  }

  async getAll(): Promise<Post[]> {
    return await this.db.getAll()
  }
}
