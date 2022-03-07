export interface AlertOptions {
  title?: string;
  text: string;
}

export interface User {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiRequest {
  method?: string;
  path: string;
  body?: unknown;
  signal?: AbortSignal;
}

export interface ApiResponse {
  status?: number;
  body?: unknown;
  error?: Error;
  aborted?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}
