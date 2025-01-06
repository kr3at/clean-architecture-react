import { Post } from "../entity/Post.entity";

export interface PostRepository {
  // Métodos básicos CRUD
  create(post: Post): Promise<void>;
  findById(id: string): Promise<Post | null>;
  findAll(): Promise<Post[]>;
  update(post: Post): Promise<void>;
  delete(id: string): Promise<void>;

  // Métodos específicos del dominio
  findByAuthorId(authorId: string): Promise<Post[]>;
  // findRecentPosts(limit: number): Promise<Post[]>;
}
