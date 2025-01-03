import { inject, injectable } from 'tsyringe';
import { UseCase } from '../../../shared/domain/UseCase';
import { Post } from '../entity/Post';
import * as PostRepository from '../repository/PostRepository';

interface GetPostsByAuthorParams {
  authorId: string;
}

interface GetPostsByAuthorResult {
  posts: Post[];
}

@injectable()
export class GetPostsByAuthorUseCase implements UseCase<GetPostsByAuthorParams, GetPostsByAuthorResult> {
  constructor(
    @inject('PostRepository') private postRepository: PostRepository.PostRepository
  ) {}

  async execute({ authorId }: GetPostsByAuthorParams): Promise<GetPostsByAuthorResult> {
    const posts = await this.postRepository.findByAuthorId(authorId);
    
    return {
      posts: posts
    };
  }
}
