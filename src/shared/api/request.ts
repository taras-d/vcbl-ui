import {
  ApiRequest,
  ApiResponse,
} from '@shared/interfaces';

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

export function request(params: ApiRequest): Promise<unknown> {
  return fetch(`${apiUrl}/${params.path}`, {
    method: params.method,
    body: JSON.stringify(params.body),
    headers: {
      'content-type': 'application/json'
    },
    signal: params.signal,
  }).then(handleResponse, handleError);
}