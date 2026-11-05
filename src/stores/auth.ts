import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

const rawApiUrl = import.meta.env.VITE_API_URL || '';
const baseUrl = rawApiUrl.endsWith('/') ? rawApiUrl : `${rawApiUrl}/`;

export interface User {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  roleID?: number;
  department?: string;
  image?: string;
  token?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  returnUrl: string | null;
}

function getStoredUser(): User | null {
  try {
    const item = localStorage.getItem('user');
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error parsing stored user from localStorage:', error);
    localStorage.removeItem('user');
    return null;
  }
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    const storedUser = getStoredUser();
    return {
      user: storedUser,
      token: storedUser?.token || null,
      returnUrl: null
    };
  },
  getters: {
    userRole: (state): string | null => state.user?.role || null,
    isAdmin: (state): boolean => state.user?.role === 'Administrator',
    isAuthenticated: (state): boolean => !!state.token
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const responseUser: any = await fetchWrapper.post(`${baseUrl}login`, { email, password });
        this.user = responseUser as User;
        this.token = responseUser?.token || responseUser?.access_token || null;
        localStorage.setItem('user', JSON.stringify(responseUser));
        
        const redirectPath = this.returnUrl || '/dashboard';
        this.returnUrl = null;
        await router.push(redirectPath);
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    async loginWithGoogle() {
      window.location.href = `${baseUrl}auth/google/redirect`;
    },

    async googleLogin(credential: string) {
      try {
        const credentialDecode: any = JSON.parse(atob(credential));
        this.user = credentialDecode as User;
        this.token = credentialDecode?.token || null;
        localStorage.setItem('user', JSON.stringify(credentialDecode));
        await router.push('/dashboard');
      } catch (error) {
        console.error('Failed to parse Google OAuth credential:', error);
        this.logout();
      }
    },
    
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      router.push('/login');
    }
  }
});