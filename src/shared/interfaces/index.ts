export interface AlertOptions {
  title?: string;
  text: string;
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
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  
}