import React, { memo } from 'react';
import VideoPost from './VideoPost';
import ImagePost from './ImagePost';
import TextPost from './TextPost';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  isActive: boolean;
}

const PostCard: React.FC<PostCardProps> = memo(({ post, isActive }) => {
  const renderContent = () => {
    switch (post.type) {
      case 'video': return <VideoPost post={post} isActive={isActive} />;
      case 'image': return <ImagePost post={post} />;
      case 'text':
      default:      return <TextPost post={post} />;
    }
  };

  return (
    <div
      className={`post-card post-card--${post.type}${isActive ? ' post-card--active' : ''}`}
      data-post-id={post.id}
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      {renderContent()}
    </div>
  );
});

PostCard.displayName = 'PostCard';
export default PostCard;
