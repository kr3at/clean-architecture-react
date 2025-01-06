// src/domains/post/components/PostListItem.tsx
import React from 'react';
import { Post } from '../entity/Post.entity';
import { InlineEditField } from './InlineEditField.component';

interface PostListItemProps {
  post: Post;
}

export const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-lg shadow p-6">
      <header className="mb-4">
        {/* El título es editable inline */}
        <InlineEditField
          postId={post.id}
          fieldName="title"
          initialValue={post.title}
        />
        <div className="text-gray-500 text-sm">
          Created: {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </header>

      {/* El contenido también es editable inline */}
      <InlineEditField
        postId={post.id}
        fieldName="content"
        initialValue={post.content}
      />
    </article>
  );
};
