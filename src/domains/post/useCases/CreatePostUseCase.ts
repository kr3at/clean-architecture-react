//@ts-ignore
import { inject, injectable } from 'tsyringe';
import { UseCase } from '../../../shared/domain/UseCase';
import { EventBus } from '../../../shared/infrastructure/events/EventBus';
import { Post } from '../../post/entity/Post';
import { CreatePostDTO } from '../../post/dto/PostDTO';
import { PostRepository } from '../../post/repository/PostRepository';
import { PostMapper } from '../../post/repository/PostMapper';

// Definimos una interfaz para el resultado del caso de uso
export interface CreatePostResult {
  post: Post;
}

@injectable()
export class CreatePostUseCase implements UseCase<CreatePostDTO, CreatePostResult> {
  constructor(
    //@ts-ignore
    @inject('PostRepository') private postRepository: PostRepository,
    //@ts-ignore
    @inject(PostMapper) private postMapper: PostMapper,
    //@ts-ignore
    @inject(EventBus) private eventBus: EventBus
  ) {}

  async execute(params: CreatePostDTO): Promise<CreatePostResult> {
    console.log('veamos los params', params)

    const post = this.postMapper.fromCreateDTO(params);

    await this.postRepository.create(post);

    this.eventBus.emit('post.created', {
      postId: post.id,
      authorId: post.authorId,
      timestamp: new Date(),
      title: post.title,
    });

    return { post };
  }
}
