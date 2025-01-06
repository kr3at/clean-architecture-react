import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PostList } from '../components/PostList.component';

export const PostListPage: React.FC = () => {
  const navigate = useNavigate();
  const currentUserId = "1"; // En producción vendría de un contexto de auth

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Posts</h1>
        <button
          onClick={() => navigate('/posts/create')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Post
        </button>
      </div>
      <PostList authorId={currentUserId} />
    </div>
  );
};
