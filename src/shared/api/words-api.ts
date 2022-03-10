import {
  ApiResponse,
  WordsListRequest,
  WordsListResponse,
  Word,
} from "@shared/interfaces";
import { request } from "./request";

function getWords(params: WordsListRequest): Promise<WordsListResponse> {
  return request({
    path: 'words',
    query: {
      $limit: params.limit,
      $skip: params.skip,
      $search: params.search,
      '$sort[createdAt]': '-1',
      '$sort[text]': '1',
    },
    signal: params.signal,
  }).then((res: ApiResponse) => {
    const body = res.body as WordsListResponse;
    body.data.forEach(decorateWord);
    return body;
  });
}

function decorateWord(word: Word): void {
  word.translateLink = `https://translate.google.com/?#en/auto/${word.text}`;
  word.imagesLink = `https://www.google.com/search?tbm=isch&q=${word.text}`;
}

export const wordsApi = {
  getWords,
};