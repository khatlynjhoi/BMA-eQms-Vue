import { ref } from 'vue';
import { useApi } from './useApi';

export interface User {
  id: number | string;
  name?: string;
  fullname?: string;
  email: string;
  role?: string;
  roleID?: number | string;
  department?: string;
  status?: number;
  image?: string;
}

export interface AuthResponse {
  access_token?: string;
  token?: string;
  user: User;
  message?: string;
}

export function useAuth() {
  const token = ref<string | null>(localStorage.getItem('laravel_api_token'));
  const user = ref<User | null>(null);

  const { callApi, loading, error, message } = useApi();

  /**
   * Handles user authentication login.
   */
  const login = async (emailValue: string, passwordValue: string): Promise<boolean> => {
    const response = await callApi<AuthResponse>('/login', 'POST', {
      email: emailValue,
      password: passwordValue,
    });

    const accessToken = response?.access_token || response?.token;

    if (response && accessToken) {
      token.value = accessToken;
      user.value = response.user;
      localStorage.setItem('laravel_api_token', accessToken);
      message.value = 'e-QMS Sign-in successful.';
      return true;
    } else {
      token.value = null;
      user.value = null;
      localStorage.removeItem('laravel_api_token');
      if (!error.value) {
        error.value = 'Authentication failed. Please verify credentials.';
      }
      return false;
    }
  };

  /**
   * Handles user logout and revokes authentication session.
   */
  const logout = async (): Promise<void> => {
    if (token.value) {
      await callApi('/logout', 'POST', undefined, token.value);
    }
    token.value = null;
    user.value = null;
    localStorage.removeItem('laravel_api_token');
    message.value = 'Logged out successfully.';
    error.value = '';
  };

  /**
   * Fetches the authenticated user profile and roles (Clause 5.3).
   */
  const fetchProfile = async (): Promise<User | null> => {
    if (!token.value) {
      error.value = 'Not authenticated. Please log in.';
      return null;
    }
    const response = await callApi<{ user: User }>('/user', 'GET', undefined, token.value);
    if (response?.user) {
      user.value = response.user;
      return response.user;
    } else {
      error.value = 'Failed to fetch user profile.';
      return null;
    }
  };

  return {
    token,
    user,
    login,
    logout,
    fetchProfile,
    loading,
    error,
    message,
  };
}