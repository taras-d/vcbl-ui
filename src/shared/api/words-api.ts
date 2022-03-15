import {
  ApiResponse,
  WordsListRequest,
  WordsListResponse,
  Word,
  WordUpdateRequest,
  NewWord,
  WordCreateResponse,
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

function createWord(words: NewWord[], signal?: AbortSignal): Promise<WordCreateResponse> {
  return request({
    method: 'post',
    path: 'words',
    signal,
    body: words,
  }).then((res: ApiResponse) => {
    const body = res.body as WordCreateResponse;
    body.created.forEach(decorateWord);
    body.updated.forEach(decorateWord);
    return body;
  })
}

function updateWord(params: WordUpdateRequest, signal?: AbortSignal): Promise<Word> {
  return request({
    method: 'patch',
    path: `words/${params.id}`,
    signal,
    body: { text: params.text, translation: params.translation },
  }).then((res: ApiResponse) => {
    return decorateWord(res.body as Word);
  });
}

function deleteWord(id: string, signal?: AbortSignal): Promise<void> {
  return request({
    method: 'delete',
    path: `words/${id}`,
    signal,
  }).then(() => null);
}

function decorateWord(word: Word): Word {
  word.translateLink = `https://translate.google.com/?sl=en&tl=uk&text=${word.text}`;
  word.imagesLink = `https://www.google.com/search?tbm=isch&q=${word.text}`;
  return word;
}

export const wordsApi = {
  getWords,
  createWord,
  updateWord,
  deleteWord,
};