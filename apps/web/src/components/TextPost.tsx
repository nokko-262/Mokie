import React from 'react';
import type { Post } from '../types';

interface TextPostProps {
  post: Post;
}

const PALETTE = ['#1a1a2e', '#16213e', '#0f3460', '#1b1b2f', '#2d132c'];

const TextPost: React.FC<TextPostProps> = ({ post }) => {
  const bg = PALETTE[Math.abs(post.id.charCodeAt(0)) % PALETTE.length];

  return (
    <div style={{
      width: '100%', height: '100%', background: bg,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '32px 24px 100px', boxSizing: 'border-box',
    }}>
      {post.subreddit && (
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 12 }}>
          r/{post.subreddit}
        </span>
      )}
      <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 700, lineHeight: 1.35, margin: 0 }}>
        {post.title}
      </h2>
      {post.body && (
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginTop: 16, lineHeight: 1.6 }}>
          {post.body.length > 280 ? post.body.slice(0, 280) + '...' : post.body}
        </p>
      )}
      <div style={{ marginTop: 20, display: 'flex', gap: 16, color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
        <span>^ {post.score?.toLocaleString()}</span>
        <span>comments {post.commentCount?.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default TextPost;
