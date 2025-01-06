// src/domains/post/components/PostList.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../shared/infrastructure/store/store';
import { PostListItem } from './PostListItem.component';
import { useLoadPosts } from '../hooks/useLoadPosts.hook';

interface PostListProps {
  authorId: string;
}

export const PostList: React.FC<PostListProps> = ({ authorId }) => {
  const { loadPosts, isLoading, error } = useLoadPosts();
  // console.log('posts', useSelector((state: any ) => state.posts.items))
  const posts = useSelector((state: RootState) => 
    Object.values(state.posts.items)
      .filter(post => post.authorId === authorId)
  );

  useEffect(() => {
    loadPosts(authorId);
  }, [authorId]);

  if (isLoading) {
    return <div className="text-gray-600">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (posts.length === 0) {
    return <div className="text-gray-600">No posts yet. Create your first post!</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
};
