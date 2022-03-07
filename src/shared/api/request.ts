import {
  ApiRequest,
  ApiResponse,
} from '@shared/interfaces';
import { currentUser } from '@shared/utils';

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

  if (currentUser.token) {
    headers['Authorization'] = `Bearer ${currentUser.token}`;
  }

  return headers;
}

export function request(params: ApiRequest): Promise<ApiResponse> {
  const url = `${apiUrl}/${params.path}${getQueryParams(params.query)}`;

  return fetch(url, {
    method: params.method,
    body: JSON.stringify(params.body),
    headers: getHeaders(),
    signal: params.signal,
  }).then(handleResponse, handleError);
}