import { Injectable } from '@nestjs/common';
import { JsonDB, Config } from 'node-json-db';
import { Post, Status, UpdatePost } from '../interfaces/posts.interface';

// The data format in the json-db:
// interface Data {
//   next_id: number
//   posts: Post[]
// }

@Injectable()
export class DBService {
  db: JsonDB

  constructor() {
    const db = new JsonDB(new Config("posts", true, false, '/'))

    this.db = db
  }

  // Initiate default value for posts entry in the json database if the entry doesn't exist
  async init() {
    try {
      await this.db.getData('/posts')
    } catch (err) {
      if (err.message.includes('Can\'t find dataPath')) {
        await this.db.push('/posts', []);
        await this.db.push('/next_id', 0);
      } else {
        throw new Error('Database error: Get data error')
      }
    }

  }

  async create(post: Post) {
    // FATAL: RACE CONDITION!!!
    const next_id = await this.db.getData('/next_id')
    post.id = next_id
    await this.db.push('/posts[]', post, true)
    await this.db.push('/next_id', next_id + 1)
  }

  async getAll(): Promise<Post[]> {
    const posts = await this.db.getData('/posts')
    return posts
  }

  async getIdle(): Promise<Post[]> {
    const posts: Post[] = await this.db.getData('/posts')
    const idlePosts = posts.filter(post => post.status == Status.IDLE)

    return idlePosts
  }

  async update(id: number, post: UpdatePost) {
    await this.db.push(`/posts[${id}]`, post, false)
  }
}
