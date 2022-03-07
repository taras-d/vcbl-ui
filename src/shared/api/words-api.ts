import {
  ApiResponse,
  WordsListRequest,
  WordsListResponse,
} from "@shared/interfaces";
import { request } from "./request";

function getWords(params: WordsListRequest): Promise<WordsListResponse> {
  return request({
    path: 'words',
    query: {
      $limit: params.limit,
      $skip: params.skip,
      $search: params.search
    }
  }).then((res: ApiResponse) => res.body as WordsListResponse);
}

export const wordsApi = {
  getWords,
};