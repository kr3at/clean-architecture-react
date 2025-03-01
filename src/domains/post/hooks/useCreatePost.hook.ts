import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../shared/infrastructure/store/store';
import { createPost } from '../../../shared/infrastructure/store/slices/postSlice';
import { PostDTO } from '../dto/Post.dto';

export const useCreatePost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: PostDTO.Create) => {
    try {
      console.log('estoy en el hook, este es el que va ha ejecutar el llamado al dispatch create Post')
      setIsLoading(true);
      setError(null);
      await dispatch(createPost(data)).unwrap();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPost: create,
    isLoading,
    error
  };
};
