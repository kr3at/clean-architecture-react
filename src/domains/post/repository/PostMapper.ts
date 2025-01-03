import { injectable } from 'tsyringe';
import { Post } from '../entity/Post';
import { CreatePostDTO, PostResponseDTO } from '../dto/PostDTO';
import { Mapper } from '../../../shared/infrastructure/mappers/Mapper';

@injectable()
export class PostMapper implements Mapper<Post, PostResponseDTO> {
  toDomain(raw: PostResponseDTO): Post {
    return new Post(
      raw.id,
      raw.title,
      raw.content,
      raw.authorId,
      new Date(raw.createdAt),
      new Date(raw.updatedAt)
    );
  }

  fromDomain(entity: Post): PostResponseDTO {
    return {
      id: entity.id,
      title: entity.title,
      content: entity.content,
      authorId: entity.authorId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    };
  }

  // Método adicional específico para la creación
  fromCreateDTO(dto: CreatePostDTO): Post {
    return new Post(
      crypto.randomUUID(),
      dto.title,
      dto.content,
      dto.authorId,
      new Date(),
      new Date()
    );
  }
}
