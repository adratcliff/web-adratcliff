import { defineStore } from 'pinia';

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
