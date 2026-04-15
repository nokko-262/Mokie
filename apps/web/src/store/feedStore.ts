import { create } from 'zustand';
import type { FeedState, Post, FeedTab } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: [],
  activeIndex: 0,
  activeTab: 'for-you',
  loading: false,
  hasMore: true,
  after: null,

  setActiveIndex: (i) => set({ activeIndex: i }),

  setActiveTab: (tab: FeedTab) => {
    set({ posts: [], activeIndex: 0, after: null, hasMore: true, activeTab: tab });
    get().fetchMore();
  },

  fetchMore: async () => {
    const { loading, hasMore, after, activeTab } = get();
    if (loading || !hasMore) return;

    set({ loading: true });
    try {
      const params = new URLSearchParams({ tab: activeTab, limit: '10' });
      if (after) params.set('after', after);

      const res  = await fetch(`${API_BASE}/api/feed?${params}`);
      const data = await res.json() as { posts: Post[]; after: string | null };

      set((s) => ({
        posts:   [...s.posts, ...data.posts],
        after:   data.after,
        hasMore: data.posts.length > 0,
        loading: false,
      }));
    } catch (err) {
      console.error('[feedStore] fetchMore failed:', err);
      set({ loading: false });
    }
  },

  likePost: (id) =>
    set((s) => ({
      posts: s.posts.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, score: (p.score ?? 0) + (p.liked ? -1 : 1) }
          : p,
      ),
    })),

  savePost: (id) =>
    set((s) => ({
      posts: s.posts.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)),
    })),

  sharePost: (id) => {
    const post = get().posts.find((p) => p.id === id);
    if (!post?.permalink) return;
    navigator.share?.({
      title: post.title,
      url: `https://reddit.com${post.permalink}`,
    }).catch(() => {
      navigator.clipboard.writeText(`https://reddit.com${post.permalink!}`);
    });
  },
}));
