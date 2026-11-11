import { useAuthStore } from '@/stores/auth';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

function request(method: string) {
  return <T = any>(url: string, body?: object): Promise<T> => {
    const requestOptions: RequestOptions = {
      method,
      headers: authHeader(url)
    };

    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(body);
    }

    return fetch(url, requestOptions).then(handleResponse);
  };
}

function authHeader(url: string): Record<string, string> {
  const token =
    localStorage.getItem('laravel_api_token') ||
    localStorage.getItem('token') ||
    useAuthStore().token;

  const rawApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '';
  const isApiUrl = !rawApiUrl || url.startsWith(rawApiUrl) || url.startsWith('/api');

  if (token && isApiUrl) {
    return {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    };
  } else {
    return {
      Accept: 'application/json'
    };
  }
}

function handleResponse(response: Response): Promise<any> {
  return response.text().then((text: string) => {
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const authStore = useAuthStore();
      if ([401, 403].includes(response.status) && authStore.token) {
        authStore.logout();
      }

      const error: string = data.message || data.error || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}