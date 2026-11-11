// Core User & Authentication Interfaces
export interface User {
  id: number | string;
  name?: string;
  fullname?: string;
  image?: string;
  email: string;
  role?: string;
  roleID?: number | string;
  department?: string;
  token?: string;
  status?: number;
}

export interface AuthResponse {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  user: User;
  message?: string;
}

// ISO 9001:2026 Domain Model Re-exports
export * from './governance';
export * from './risk';
export * from './qms';
export * from './improvement';