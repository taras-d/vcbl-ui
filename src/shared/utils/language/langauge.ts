import { storage } from '@shared/utils';
import { TranslateLang, TranslateDict } from '@shared/interfaces';

declare global {
  interface Window {
    __lang: Promise<TranslateDict>;
  }
}

const dictPromise = window.__lang;
delete window.__lang;

let dict: TranslateDict;

function init(): Promise<void> {
  return dictPromise
    .then((res: TranslateDict) => dict = res)
    .then(() => null);
}


function get(): TranslateLang {
  return storage.get('lang') as TranslateLang || 'en';
}

function set(value: TranslateLang): void {
  storage.set('lang', value);
  location.reload();
}

export function tkey(key: string): string {
  return dict[key] || '';
}

export const language = {
  init,
  set,
  get,
}