// Existing Core User & Auth Interfaces
export interface User {
  id: number;
  name: string;
  image: string;
  email: string;
  role?: string;
  department?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

// ISO 9001:2026 Domain Model Re-exports
export * from './governance';
export * from './risk';
export * from './qms';
export * from './improvement';