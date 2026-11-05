import { defineStore } from 'pinia';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import type { User } from './auth';

const rawApiUrl = import.meta.env.VITE_API_URL || '';
const baseUrl = rawApiUrl.endsWith('/') ? `${rawApiUrl}users` : `${rawApiUrl}/users`;

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    users: [],
    loading: false,
    error: null
  }),

  actions: {
    async getAll() {
      this.loading = true;
      this.error = null;
      try {
        const data: any = await fetchWrapper.get(baseUrl);
        this.users = Array.isArray(data) ? (data as User[]) : (data?.users as User[]) || [];
      } catch (err: any) {
        console.error('Error loading users:', err);
        this.error = err?.message || 'Failed to fetch user list';
        this.users = [];
      } finally {
        this.loading = false;
      }
    }
  }
});