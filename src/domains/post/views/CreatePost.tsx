import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreatePostForm } from '../components/CreatePostForm';

export const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  
  const currentUserId = "1"; // En producción vendría de un contexto de auth

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800"
          >
            Back to Posts
          </button>
        </div>
        <CreatePostForm authorId={currentUserId} />
      </div>
    </div>
  );
}; 