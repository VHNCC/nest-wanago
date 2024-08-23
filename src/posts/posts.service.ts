import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/updatePost.dto';
import { CreatePostDto } from './dto/createPost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import PostEntity from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostsById(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (post) {
      return post;
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }

  async replacePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatePost = await this.postsRepository.findOne({ where: { id } });
    if (updatePost) {
      return updatePost;
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }

  async createPost(post: CreatePostDto) {
    const newPost = await this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async deletePost(id: number) {
    const deletePost = await this.postsRepository.delete(id);
    if (!deletePost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
