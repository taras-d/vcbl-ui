import {
  ApiResponse,
  WordsListRequest,
  WordsListResponse,
  Word,
} from "@shared/interfaces";
import { request } from "./request";

function getWords(params: WordsListRequest, signal?: AbortSignal): Promise<WordsListResponse> {
  return request({
    path: 'words',
    query: {
      $limit: params.limit || 15,
      $skip: params.skip,
      $search: params.search,
      '$sort[createdAt]': '-1',
      '$sort[text]': '1',
    },
    signal,
  }).then((res: ApiResponse) => {
    const body = res.body as WordsListResponse;
    body.data.forEach(decorateWord);
    return body;
  });
}

function deleteWord(id: string, signal?: AbortSignal): Promise<void> {
  return request({
    method: 'delete',
    path: `words/${id}`,
    signal,
  }).then(() => null);
}

function decorateWord(word: Word): void {
  word.translateLink = `https://translate.google.com/?#en/auto/${word.text}`;
  word.imagesLink = `https://www.google.com/search?tbm=isch&q=${word.text}`;
}

export const wordsApi = {
  getWords,
  deleteWord,
};