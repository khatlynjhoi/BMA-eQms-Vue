import { ref } from 'vue';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export function useApi() {
  const loading = ref<boolean>(false);
  const error = ref<string>('');
  const message = ref<string>('');

  /**
   * Generic function to make authenticated e-QMS API requests.
   * @param endpoint The API route path (e.g., '/login', '/risk-and-opportunity/risk-list')
   * @param method HTTP method (GET, POST, PUT, DELETE)
   * @param data Body object or FormData
   * @param authToken Bearer token (defaults to stored token)
   * @param isFormData Set true for file uploads
   */
  const callApi = async <T>(
    endpoint: string,
    method: string = 'GET',
    data?: any,
    authToken: string | null = null,
    isFormData: boolean = false
  ): Promise<T | null> => {
    loading.value = true;
    error.value = '';
    message.value = '';

    const token = authToken || localStorage.getItem('laravel_api_token');

    const headers: HeadersInit = {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      'Accept': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const config: RequestInit = {
        method,
        headers,
        body: isFormData ? data : (data ? JSON.stringify(data) : undefined),
      };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        
        // Handle PDF blob or octet-stream responses
        if (contentType && (contentType.includes('application/pdf') || contentType.includes('octet-stream'))) {
          message.value = 'Document retrieved successfully.';
          return (await response.blob()) as T;
        }

        const result = await response.json();
        message.value = result.message || 'Operation completed successfully.';
        return result as T;
      } else {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        error.value = `API Error: ${errorData.message || 'Server request failed.'} (Status: ${response.status})`;
        return null;
      }
    } catch (err: any) {
      console.error('Network request failed:', err);
      error.value = `Network error: ${err.message || 'Connection failed.'}`;
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { callApi, loading, error, message };
}