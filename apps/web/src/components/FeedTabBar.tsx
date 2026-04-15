import React from 'react';
import type { FeedTab } from '../types';

interface FeedTabBarProps {
  activeTab: FeedTab;
  onTabChange: (tab: FeedTab) => void;
}

const TABS: { id: FeedTab; label: string }[] = [
  { id: 'for-you',   label: 'For You' },
  { id: 'following', label: 'Following' },
  { id: 'trending',  label: 'Trending' },
];

const FeedTabBar: React.FC<FeedTabBarProps> = ({ activeTab, onTabChange }) => (
  <div style={{
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', justifyContent: 'center', gap: 24,
    padding: '12px 0 8px',
    background: 'linear-gradient(rgba(0,0,0,0.5), transparent)',
  }}>
    {TABS.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.5)',
          fontSize: 15,
          fontWeight: activeTab === tab.id ? 700 : 400,
          borderBottom: activeTab === tab.id ? '2px solid #fff' : '2px solid transparent',
          paddingBottom: 4,
          transition: 'all 0.15s ease',
        }}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default FeedTabBar;
