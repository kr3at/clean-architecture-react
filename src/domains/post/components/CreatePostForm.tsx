import React, { useState } from 'react';
import { useCreatePost } from '../hooks/useCreatePost';

interface CreatePostFormProps {
  authorId: string;
  onSuccess?: () => void;
}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({ 
  authorId, 
  onSuccess 
}) => {
  const { createPost, isLoading, error } = useCreatePost();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await createPost({
      title,
      content,
      authorId
    });

    if (onSuccess) {
      onSuccess();
    }

    // Limpiamos el formulario
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-red-600 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="content" className="block font-medium">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded p-2 h-32"
          required
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
};
