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
  query?: Record<string, unknown>;
  hideError?: boolean;
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

export interface Word {
  _id: string;
  text: string;
  translation: string;
  createdAt: string;
  updatedAt: string;
  translateLink: string;
  imagesLink: string;
}

export interface WordsListRequest {
  limit?: number;
  skip?: number;
  search?: string;
}

export interface WordsListResponse {
  data: Word[];
  limit: number;
  skip: number;
  total: number;
}
