export type PostType = 'video' | 'image' | 'text';

export interface Post {
  id: string;
  type: PostType;
  title?: string;
  body?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  subreddit?: string;
  author?: string;
  score?: number;
  commentCount?: number;
  permalink?: string;
  liked?: boolean;
  saved?: boolean;
  createdAt?: number;
}

export type FeedTab = 'for-you' | 'following' | 'trending';

export interface FeedState {
  posts: Post[];
  activeIndex: number;
  activeTab: FeedTab;
  loading: boolean;
  hasMore: boolean;
  after: string | null;
  setActiveIndex: (i: number) => void;
  setActiveTab: (tab: FeedTab) => void;
  fetchMore: () => Promise<void>;
  likePost: (id: string) => void;
  savePost: (id: string) => void;
  sharePost: (id: string) => void;
}

export interface SettingsState {
  ageVerified: boolean;
  nsfw: boolean;
  autoplay: boolean;
  muteByDefault: boolean;
  setAgeVerified: (v: boolean) => void;
  toggleNsfw: () => void;
  toggleAutoplay: () => void;
  toggleMute: () => void;
}
