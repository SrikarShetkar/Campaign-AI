import { create } from 'zustand';

export const useAppStore = create((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  
  notificationsCount: 4,
  clearNotifications: () => set({ notificationsCount: 0 }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
