import React from 'react';
import { useFeedStore } from '../store/feedStore';
import type { Post } from '../types';

interface FeedOverlayProps {
  post: Post;
}

const FeedOverlay: React.FC<FeedOverlayProps> = ({ post }) => {
  const { likePost, savePost, sharePost } = useFeedStore();

  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      {/* Right action rail */}
      <div style={{
        position: 'absolute', right: 12, bottom: 100,
        display: 'flex', flexDirection: 'column', gap: 20,
        alignItems: 'center', pointerEvents: 'all',
      }}>
        <ActionBtn label={post.liked ? 'liked' : 'like'} count={post.score}        onClick={() => likePost(post.id)} />
        <ActionBtn label="comment"                        count={post.commentCount} onClick={() => {}} />
        <ActionBtn label="save"                           count={null}              onClick={() => savePost(post.id)} />
        <ActionBtn label="share"                          count={null}              onClick={() => sharePost(post.id)} />
      </div>

      {/* Bottom meta */}
      <div style={{
        padding: '0 16px 24px', pointerEvents: 'none',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.55))',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, margin: '0 0 4px' }}>r/{post.subreddit}</p>
        <p style={{ color: '#fff', fontSize: 14, fontWeight: 600, margin: 0 }}>
          {post.title?.slice(0, 80)}{(post.title?.length ?? 0) > 80 ? '...' : ''}
        </p>
      </div>
    </div>
  );
};

const ActionBtn: React.FC<{ label: string; count: number | null | undefined; onClick: () => void }> = ({ label, count, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: 'none', border: 'none', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 0,
    }}
  >
    <span style={{ fontSize: 26, lineHeight: 1 }}>{label}</span>
    {count != null && (
      <span style={{ color: '#fff', fontSize: 11 }}>
        {count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count}
      </span>
    )}
  </button>
);

export default FeedOverlay;
