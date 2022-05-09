export type LanagugeDictionary = Record<string, string>;

export type TranslateWrapFn = (
  translate: (value: string, ...replace: unknown[]) => string
) => string;

export interface AlertOptions {
  title?: string | TranslateWrapFn;
  text?: string | TranslateWrapFn;
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
  hideDefaultError?: boolean;
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
  token: string;
  user: User;
}

export interface Word {
  _id: string;
  text: string;
  translation: string;
  createdAt: string;
  updatedAt: string;
  translateLink?: string;
  imagesLink?: string;
  deleted?: boolean;
}

export interface WordsRequest {
  limit?: number;
  skip?: number;
  search?: string;
}

export interface WordsResponse {
  data: Word[];
  limit: number;
  skip: number;
  total: number;
}

export interface WordUpdateRequest {
  id: string;
  text: string;
  translation: string;
}

export interface WordCreateResponse {
  created: Word[];
  updated: Word[];
}

export interface NewWord {
  text: string;
  translation: string;
}
