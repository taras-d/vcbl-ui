import {
  ApiResponse,
  WordsRequest,
  WordsResponse,
  Word,
  WordUpdateRequest,
  NewWord,
  WordCreateResponse,
} from "@shared/interfaces";
import { request } from "./request";

function getWords(params: WordsRequest, signal?: AbortSignal): Promise<WordsResponse> {
  return request({
    path: 'words',
    query: {
      skip: params.skip,
      limit: params.limit || 20,
      search: params.search || null
    },
    signal,
  }).then((res: ApiResponse) => {
    const body = res.body as WordsResponse;
    body.data.forEach(decorateWord);
    return body;
  });
}

function getRandomWords(signal?: AbortSignal): Promise<Word[]> {
  return request({
    path: 'words/random',
    signal
  }).then((res: ApiResponse) => {
    const words = res.body as Word[];
    words.forEach(decorateWord);
    return words;
  })
}

function getStatsYears(signal?: AbortSignal): Promise<number[]> {
  return request({
    path: 'stats/years',
    signal,
  }).then((res: ApiResponse) => {
    return res.body as number[];
  });
}

function getStatsData(year: number, signal?: AbortSignal): Promise<number[]> {
  return request({
    path: 'stats/data',
    query: { year },
    signal,
  }).then((res: ApiResponse) => {
    return res.body as number[];
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
    body.created.sort((a: Word, b: Word) => {
      return (+new Date(b.createdAt) - +new Date(a.createdAt)) || a.text.localeCompare(b.text);
    });
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
  getRandomWords,
  getStatsYears,
  getStatsData,
  createWord,
  updateWord,
  deleteWord,
};
