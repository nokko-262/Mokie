import React, { useState } from 'react';
import type { Post } from '../types';

interface ImagePostProps {
  post: Post;
}

const ImagePost: React.FC<ImagePostProps> = ({ post }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{
      width: '100%', height: '100%', background: '#111',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, background: '#1a1a1a' }} />
      )}
      <img
        src={post.mediaUrl}
        alt={post.title ?? 'post image'}
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%', height: '100%', objectFit: 'contain',
          opacity: loaded ? 1 : 0, transition: 'opacity 0.2s ease',
        }}
      />
      {post.title && (
        <div style={{
          position: 'absolute', bottom: 80, left: 16, right: 72,
          color: '#fff', fontSize: 14, textShadow: '0 1px 3px rgba(0,0,0,0.8)',
        }}>
          {post.title}
        </div>
      )}
    </div>
  );
};

export default ImagePost;
