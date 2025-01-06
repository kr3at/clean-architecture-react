import { injectable } from "tsyringe";
import { Mapper } from "../../../shared/infrastructure/mappers/Mapper.interface";
import { Post } from "../entity/Post.entity";
import { PostDTO } from "../dto/Post.dto";

@injectable()
export class PostMapper implements Mapper<Post, PostDTO.PostResponse> {
  toDomain(raw: PostDTO.PostResponse): Post {
    return new Post(
      raw.id,
      raw.title,
      raw.content,
      raw.authorId,
      new Date(raw.createdAt),
      new Date(raw.updatedAt)
    );
  }

  fromDomain(entity: Post): PostDTO.PostResponse {
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
  fromCreateDTO(dto: PostDTO.Create): Post {
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
