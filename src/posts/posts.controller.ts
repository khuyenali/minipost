import { Controller, Post, Get, Param, Req, Body } from '@nestjs/common';
import { PostsService } from './posts.service';

import { Post as IPost } from './interfaces/posts.interface';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) { }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<string> {
    return await this.postService.create(createPostDto.coverUrl)
  }

  @Get()
  async getAll(): Promise<IPost[]> {
    return this.postService.getAll()
  }
}

