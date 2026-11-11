export interface UserPayload {
  id: number | string;
  username?: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  roleID?: number | string;
  department?: string;
}

export interface LoginResponse {
  access_token?: string;
  token?: string;
  user: UserPayload;
  message?: string;
}

const rawApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const baseUrl = rawApiUrl.endsWith('/') ? rawApiUrl : `${rawApiUrl}/`;

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${baseUrl}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ email: username, password })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Authentication failed' }));
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
}