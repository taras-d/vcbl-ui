import { AppRoutes } from '@shared/enums';
import {
  ApiResponse,
  LoginRequest,
  LoginResponse
} from '@shared/interfaces';
import { history, currentUser } from '@shared/utils';
import { request } from './request';

function login(body: LoginRequest, signal?: AbortSignal): Promise<void> {
  return request({ method: 'post', path: 'authentication', body, signal })
    .then((res: ApiResponse) => {
      currentUser.save(res.body as LoginResponse);
      history.push(AppRoutes.Home);
    });
}

function logout(): void {
  currentUser.remove();
  history.push(AppRoutes.Login);
}

export const authApi = {
  login,
  logout,
}