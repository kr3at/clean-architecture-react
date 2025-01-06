import { inject, injectable } from 'tsyringe';
import { EventBus } from '../../../shared/infrastructure/events/EventBus';
import { Post } from '../../post/entity/Post.entity';

interface NotificationState {
  recentPosts: Post[];
  notifications: Array<{ id: string; message: string }>;
}

@injectable()
export class GetRecentNotificationsUseCase {
  private MAX_POSTS = 2;
  private MAX_NOTIFICATIONS = 5;

  constructor(@inject(EventBus) private eventBus: EventBus) {}

  execute(onUpdate: (state: NotificationState) => void): () => void {
    let recentPosts: Post[] = [];
    let notifications: Array<{ id: string; message: string }> = [];

    return this.eventBus.subscribe('post.created', (post: Post) => {
      recentPosts = [post, ...recentPosts].slice(0, this.MAX_POSTS);
      notifications = [{
        id: crypto.randomUUID(),
        message: `New post created: ${post.title}`
      }, ...notifications].slice(0, this.MAX_NOTIFICATIONS);

      onUpdate({ recentPosts, notifications });
    });
  }
}
