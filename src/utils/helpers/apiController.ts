export interface UserDirectoryItem {
  id: number | string;
  username: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  department?: string;
}

export interface AuthControllerResponse {
  id: number | string;
  username: string;
  name: string;
  token: string;
  user: UserDirectoryItem;
}

const rawApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const apiUrl = rawApiUrl.endsWith('/') ? rawApiUrl.slice(0, -1) : rawApiUrl;

export const apiController = {
  authenticate,
  getUsers
};

async function authenticate(username: string, password: string, link?: string): Promise<AuthControllerResponse> {
  const targetUrl = link || `${apiUrl}/login`;
  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      email: username,
      password
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Authentication failed' }));
    throw new Error(errorData.message || 'Authentication failed');
  }

  const data = await response.json();
  const token = data.access_token || data.token;
  const user = data.user || data;

  return {
    id: user.id,
    username: user.email || username,
    name: user.name || `${user.first_name || ''} ${user.last_name || ''}`.trim(),
    token,
    user: {
      id: user.id,
      username: user.email,
      name: user.name || `${user.first_name || ''} ${user.last_name || ''}`.trim(),
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      role: user.role,
      department: user.department
    }
  };
}

async function getUsers(authToken?: string): Promise<UserDirectoryItem[]> {
  const token = authToken || localStorage.getItem('laravel_api_token');
  const response = await fetch(`${apiUrl}/users`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unauthorized access' }));
    throw new Error(errorData.message || 'Unauthorized access');
  }

  const data = await response.json();
  const userList = Array.isArray(data) ? data : data.users || [];

  return userList.map((user: any) => ({
    id: user.id,
    username: user.email,
    name: user.name || `${user.first_name || ''} ${user.last_name || ''}`.trim(),
    firstName: user.first_name || '',
    lastName: user.last_name || '',
    role: user.role,
    department: user.department
  }));
}