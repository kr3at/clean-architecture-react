//@ts-ignore
import { inject, injectable } from 'tsyringe';
import { Post } from '../entity/Post.entity';
import { UseCase } from '../../../shared/domain/UseCase.shared';
import { PostDTO } from '../dto/Post.dto';

// Definimos una interfaz para el resultado del caso de uso
export interface CreatePostResult {
  post: Post;
}

@injectable()
export class CreatePostUseCase implements UseCase<PostDTO.Create, CreatePostResult> {
  constructor(
    //@ts-ignore
    @inject('PostRepository') private postRepository: PostRepository,
    //@ts-ignore
    @inject(PostMapper) private postMapper: PostMapper,
    //@ts-ignore
    @inject(EventBus) private eventBus: EventBus
  ) {}

  async execute(params: PostDTO.Create): Promise<CreatePostResult> {
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
