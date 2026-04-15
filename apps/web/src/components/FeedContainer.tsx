import React, { useRef, useEffect, useCallback } from 'react';
import { useFeedStore } from '../store/feedStore';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import PostCard from './PostCard';
import FeedTabBar from './FeedTabBar';
import FeedOverlay from './FeedOverlay';
import type { Post } from '../types';

const FeedContainer: React.FC = () => {
  const {
    posts, activeIndex, setActiveIndex,
    fetchMore, hasMore, loading,
    activeTab, setActiveTab,
  } = useFeedStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef  = useRef<HTMLDivElement>(null);

  // Kick off initial load
  useEffect(() => { fetchMore(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Infinite scroll sentinel
  useIntersectionObserver(sentinelRef, () => {
    if (hasMore && !loading) fetchMore();
  });

  // Snap-scroll index tracking
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    const idx = Math.round(scrollTop / clientHeight);
    if (idx !== activeIndex) setActiveIndex(idx);
  }, [activeIndex, setActiveIndex]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="feed-root">
      <FeedTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <div
        ref={containerRef}
        className="feed-scroll-container"
        style={{
          height: '100dvh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {posts.map((post: Post, i: number) => (
          <div
            key={post.id}
            style={{ scrollSnapAlign: 'start', height: '100dvh', position: 'relative' }}
          >
            <PostCard post={post} isActive={i === activeIndex} />
            {i === activeIndex && <FeedOverlay post={post} />}
          </div>
        ))}

        {loading && (
          <div style={{ height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="spinner" />
          </div>
        )}

        <div ref={sentinelRef} style={{ height: 1 }} />
      </div>
    </div>
  );
};

export default FeedContainer;
