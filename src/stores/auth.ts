import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

const rawApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const baseUrl = rawApiUrl.endsWith('/') ? rawApiUrl : `${rawApiUrl}/`;

export interface User {
  id?: number | string;
  name?: string;
  email?: string;
  role?: string;
  roleID?: number | string;
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

function getStoredToken(): string | null {
  return localStorage.getItem('laravel_api_token') || getStoredUser()?.token || null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    const storedUser = getStoredUser();
    return {
      user: storedUser,
      token: getStoredToken(),
      returnUrl: null
    };
  },
  getters: {
    userRole: (state): string | null => state.user?.role || null,
    isAdmin: (state): boolean => state.user?.role === 'Administrator' || state.user?.role === 'System Administrator',
    isAuthenticated: (state): boolean => !!state.token
  },
  actions: {
    async login(email: string, password: string): Promise<void> {
      try {
        const responseUser: any = await fetchWrapper.post(`${baseUrl}login`, { email, password });
        this.user = responseUser?.user || (responseUser as User);
        const accessToken = responseUser?.token || responseUser?.access_token || null;
        this.token = accessToken;

        if (accessToken) {
          localStorage.setItem('laravel_api_token', accessToken);
        }
        localStorage.setItem('user', JSON.stringify(this.user));
        
        const redirectPath = this.returnUrl || '/dashboard';
        this.returnUrl = null;
        await router.push(redirectPath);
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    async loginWithGoogle(): Promise<void> {
      window.location.href = `${baseUrl}auth/google/redirect`;
    },

    async googleLogin(credential: string): Promise<void> {
      try {
        const credentialDecode: any = JSON.parse(atob(credential));
        this.user = credentialDecode as User;
        this.token = credentialDecode?.token || null;
        if (this.token) {
          localStorage.setItem('laravel_api_token', this.token);
        }
        localStorage.setItem('user', JSON.stringify(credentialDecode));
        await router.push('/dashboard');
      } catch (error) {
        console.error('Failed to parse Google OAuth credential:', error);
        this.logout();
      }
    },
    
    logout(): void {
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('laravel_api_token');
      localStorage.removeItem('token');
      router.push('/login');
    }
  }
});