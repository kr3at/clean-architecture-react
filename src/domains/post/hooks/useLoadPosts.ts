import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { AppDispatch } from '../../../shared/infrastructure/store/store';
import { loadAuthorPosts } from '../../../shared/infrastructure/store/slices/postSlice';

export const useLoadPosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async (authorId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await dispatch(loadAuthorPosts(authorId)).unwrap();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading posts');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loadPosts,
    isLoading,
    error
  };
};
