import React, { useRef, useEffect } from 'react';
import type { Post } from '../types';

interface VideoPostProps {
  post: Post;
  isActive: boolean;
}

const VideoPost: React.FC<VideoPostProps> = ({ post, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isActive) {
      vid.play().catch(() => { /* autoplay blocked */ });
    } else {
      vid.pause();
      vid.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div style={{ width: '100%', height: '100%', background: '#000', position: 'relative' }}>
      <video
        ref={videoRef}
        src={post.mediaUrl}
        poster={post.thumbnailUrl}
        loop
        muted
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {post.title && (
        <div style={{
          position: 'absolute', bottom: 80, left: 16, right: 72,
          color: '#fff', fontSize: 15, fontWeight: 600,
          textShadow: '0 1px 4px rgba(0,0,0,0.7)',
        }}>
          {post.title}
        </div>
      )}
    </div>
  );
};

export default VideoPost;
