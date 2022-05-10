import {
  ApiRequest,
  ApiResponse,
} from '@shared/interfaces';
import { Modal } from '@shared/ui';
import { storage } from '@shared/utils';
import { userApi } from '@shared/api';

const apiUrl = 'https://vcbl-api.herokuapp.com';

function isSessionInvalid(response: ApiResponse, params: ApiRequest): boolean {
  return response.status === 401 && params.path !== 'user/login';
}

function handleResponse(response: Response): Promise<ApiResponse> {
  return response.text()
    .then((text: string) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        return null;
      }
    })
    .then((body: unknown) => {
      const apiRes = { status: response.status, body };

      if (response.ok) {
        return apiRes;
      }

      throw apiRes;
    });
}

function handleError(error: Error | ApiResponse, params: ApiRequest): Promise<ApiResponse> {
  let apiResponse: ApiResponse;

  if (error instanceof Error) {
    apiResponse = {
      error,
      aborted: error.name === 'AbortError'
    }
  } else {
    apiResponse = error;
  }

  if (!apiResponse.aborted) {
    if (isSessionInvalid(apiResponse, params)) {
      userApi.logout();
    } else if (!params.hideDefaultError) {
      Modal.alert();
    }
  }

  return Promise.reject(apiResponse);
}

function getQueryParams(query: Record<string, unknown>): string {
  if (!query) {
    return '';
  }

  const params = new URLSearchParams();

  for (const key in query) {
    const val = query[key];
    if (val !== undefined && val !== null) {
      params.set(key, `${val}`);
    }
  }

  const paramsStr = params.toString();

  return paramsStr ? `?${paramsStr}` : '';
}

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  const token = storage.get('token');

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

export function request(params: ApiRequest): Promise<ApiResponse> {
  const url = `${apiUrl}/${params.path}${getQueryParams(params.query)}`;

  return fetch(url, {
    method: params.method?.toUpperCase(),
    body: JSON.stringify(params.body),
    headers: getHeaders(),
    signal: params.signal,
  })
    .then(handleResponse)
    .catch(err => handleError(err, params));
}