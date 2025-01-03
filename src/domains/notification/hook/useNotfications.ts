import { useState, useEffect } from 'react';
import { container } from 'tsyringe';
import { GetRecentNotificationsUseCase } from '../useCases/GetRecentNotificationsUseCase';
import { Post } from '../../post/entity/Post';

export const useNotifications = () => {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [notifications, setNotifications] = useState<Array<{id: string, message: string}>>([]);

  useEffect(() => {
    const useCase = container.resolve(GetRecentNotificationsUseCase);
    const unsubscribe = useCase.execute(({ recentPosts, notifications }) => {
      setRecentPosts(recentPosts);
      setNotifications(notifications);
    });

    return unsubscribe;
  }, []);

  return { recentPosts, notifications };
};
