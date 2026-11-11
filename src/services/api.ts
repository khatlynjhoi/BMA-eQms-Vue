import { useAuthStore } from '@/stores/auth';
import { router } from '@/router';

const rawApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const baseUrl = rawApiUrl.endsWith('/') ? rawApiUrl : `${rawApiUrl}/`;

export async function api(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const authStore = useAuthStore();
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;

  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    'Accept': 'application/json',
    ...((options.headers as Record<string, string>) || {})
  };

  const token = authStore.token || localStorage.getItem('laravel_api_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(baseUrl + cleanUrl, {
    ...options,
    headers
  });

  if (res.status === 401) {
    authStore.logout();
    router.push('/login');
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw {
      status: res.status,
      error
    };
  }

  return res;
}