import { inject, injectable } from 'tsyringe';
import { PostRepository } from '../PostRepository';
import { Post } from '../../entity/Post';
import { ApiClient } from '../../../../shared/infrastructure/http/ApiClient';
import { PostMapper } from '../PostMapper';

@injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(
    @inject(ApiClient) private apiClient: ApiClient,
    @inject(PostMapper) private mapper: PostMapper
  ) {}

  async create(post: Post): Promise<void> {
    console.log('create POST', post )
    const dto = this.mapper.fromDomain(post);
    const response = await this.apiClient.post('posts', dto);
    console.log('response', response)
  }

  async findById(id: string): Promise<Post | null> {
    try {
      const response = await this.apiClient.get(`posts/${id}`);
      return this.mapper.toDomain(response as any);
    } catch {
      return null;
    }
  }

  async findAll(): Promise<Post[]> {
    const response = await this.apiClient.get('/posts');
    //@ts-ignore
    return response.map(dto => this.mapper.toDomain(dto));
  }

  async findByAuthorId(authorId: string): Promise<Post[]> {
    const response = await this.apiClient.get(`posts?authorId=${authorId}`);
    //@ts-ignore
    return response.map(dto => this.mapper.toDomain(dto));
  }

  async update(post: Post): Promise<void> {
    const dto = this.mapper.fromDomain(post);
    //@ts-ignore
    await this.apiClient.put(`posts/${post.id}`, dto);
  }

  async delete(id: string): Promise<void> {
    //@ts-ignore
    await this.apiClient.delete(`posts/${id}`);
  }
}
