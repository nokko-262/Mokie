import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SettingsState } from '../types';

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ageVerified:    false,
      nsfw:           false,
      autoplay:       true,
      muteByDefault:  true,

      setAgeVerified: (v) => set({ ageVerified: v }),
      toggleNsfw:     ()  => set((s) => ({ nsfw: !s.nsfw })),
      toggleAutoplay: ()  => set((s) => ({ autoplay: !s.autoplay })),
      toggleMute:     ()  => set((s) => ({ muteByDefault: !s.muteByDefault })),
    }),
    { name: 'mokie-settings' },
  ),
);
