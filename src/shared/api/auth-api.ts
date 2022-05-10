import {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  AppRoutes,
  User,
} from '@shared/interfaces';
import { history, storage } from '@shared/utils';
import { request } from './request';

function login(body: LoginRequest, signal?: AbortSignal): Promise<void> {
  return request({ method: 'post', path: 'user/login', body, signal })
    .then((res: ApiResponse) => {
      const token = (res.body as LoginResponse).token;
      storage.set('token', token);
      history.push(AppRoutes.Home);
    });
}

function logout(): void {
  storage.remove('token');
  history.push(AppRoutes.Login);
}

function getMe(signal?: AbortSignal): Promise<User> {
  return request({ method: 'get', path: 'user/me', signal, hideDefaultError: true })
    .then((res: ApiResponse) => res.body as User);
}

export const userApi = {
  login,
  logout,
  getMe,
}