import { defineStore, storeToRefs } from 'pinia';
import { createStore } from '@/stores/utils';
import { stringToHslColor } from '@/utils';

export const useAppStore = defineStore('app', {
  state: () => ({ token: '', userId: '' }),
  getters: {},
  actions: {
    pageLoad(token = localStorage.getItem('adratcliff-user-token')) {
      if (!token) return;
      this.token = token;
      this.userId = token.slice(0, 64);
    },
    async login(data) {
      try {
        localStorage.setItem('adratcliff-user-token', data.token);
        this.pageLoad(data.token);
        return data.token;
      } catch (err) {
        console.warn('Error logging in', err);
        return false;
      }
    },
    logout() {
      this.token = '';
      this.userId = '';
      localStorage.removeItem('adratcliff-user-token');
    },
  },
});

export const useUserStore = createStore('users', {
  self(state) {
    const { userId } = storeToRefs(useAppStore());
    if (!userId.value || !(userId.value in state.resources)) return {};
    const user = state.resources[userId.value];
    return {
      ...user,
      initials: (user.firstName || '').slice(0, 1) + (user.lastName || '').slice(0, 1),
      color: stringToHslColor(`${user.firstName || ''} ${user.lastName || ''}`, 50, 70),
    };
  },
});