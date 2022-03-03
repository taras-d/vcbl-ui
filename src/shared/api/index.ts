import { AppRoutes } from '@shared/enums';
import {
  ApiRequest,
  ApiResponse,
  LoginRequest,
  LoginResponse
} from '@shared/interfaces';
import { history, currentUser } from '@shared/utils';

const apiUrl = 'https://vcbl.herokuapp.com';

function handleResponse(response: Response): Promise<ApiResponse> {
  return response.json()
    .then((body: unknown) => {
      const apiRes = { status: response.status, body };

      if (response.ok) {
        return apiRes;
      }

      throw apiRes;
    });
}

function handleError(error: Error): Promise<ApiResponse> {
  return Promise.reject({
    error,
    aborted: error.name === 'AbortError'
  });
}

function request(params: ApiRequest): Promise<unknown> {
  return fetch(`${apiUrl}/${params.path}`, {
    method: params.method,
    body: JSON.stringify(params.body),
    headers: {
      'content-type': 'application/json'
    },
    signal: params.signal,
  }).then(handleResponse, handleError);
}

function login(body: LoginRequest, signal?: AbortSignal): Promise<void> {
  return request({ method: 'post', path: 'authentication', body, signal })
    .then((res: ApiResponse) => {
      currentUser.save(res.body as LoginResponse);
      history.push(AppRoutes.Home);
    });
}

function logout(): void {
  currentUser.remove();
}

export const api = {
  login,
  logout,
}