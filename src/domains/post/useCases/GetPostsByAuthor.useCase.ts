import { inject, injectable } from 'tsyringe';
import { Post } from '../entity/Post.entity';
import { UseCase } from '../../../shared/domain/UseCase.shared';
import * as PostRepositoryInterface from '../repository/PostRepository.interface';

interface GetPostsByAuthorParams {
  authorId: string;
}

interface GetPostsByAuthorResult {
  posts: Post[];
}

@injectable()
export class GetPostsByAuthorUseCase implements UseCase<GetPostsByAuthorParams, GetPostsByAuthorResult> {
  constructor(
    @inject('PostRepository') private postRepository: PostRepositoryInterface.PostRepository
  ) {}

  async execute({ authorId }: GetPostsByAuthorParams): Promise<GetPostsByAuthorResult> {
    const posts = await this.postRepository.findByAuthorId(authorId);
    
    return {
      posts: posts
    };
  }
}
