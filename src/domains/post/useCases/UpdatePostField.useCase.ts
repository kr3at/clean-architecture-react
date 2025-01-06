import { inject, injectable } from "tsyringe";
import { UseCase } from "../../../shared/domain/UseCase.shared";
import { UpdatePostFieldParams } from "../dto/UpdatePostField.params";
import * as PostRepositoryInterface from "../repository/PostRepository.interface";
import { EventBus } from "../../../shared/infrastructure/events/EventBus";

@injectable()
export class UpdatePostFieldUseCase implements UseCase<UpdatePostFieldParams, void> {
  constructor(
    @inject('PostRepository') private postRepository: PostRepositoryInterface.PostRepository,
    @inject(EventBus) private eventBus: EventBus
  ) {}

  async execute({ postId, field, value }: UpdatePostFieldParams): Promise<void> {
    // 1. Obtener el post actual
    const post = await this.postRepository.findById(postId);
    if (!post) throw new Error('Post not found');

    // 2. Actualizar solo el campo específico
    //@ts-ignore
    post[field] = value;
    
    // 3. Guardar el cambio
    await this.postRepository.update(post);

    // 4. Emitir evento específico del campo
    this.eventBus.emit('post.field.updated', {
      postId,
      field,
      value,
      timestamp: new Date()
    });
  }
}
