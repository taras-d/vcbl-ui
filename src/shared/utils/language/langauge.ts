import { storage, isObject } from '@shared/utils';
import { TranslateLang, TranslateDict } from '@shared/interfaces';

declare global {
  interface Window {
    __lang: Promise<TranslateDict>;
  }
}

const dictPromise = window.__lang;
delete window.__lang;

let dict: TranslateDict;

function transform(dict: TranslateDict, path?: string): TranslateDict {
  const result: TranslateDict = {};

  for (const key in dict) {
    const val = dict[key];
    const newKey = path ? `${path}.${key}` : key;

    if (typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(result, transform(val, newKey));
    } else {
      result[newKey] = val;
    }
  }

  return result;
}

function init(): Promise<void> {
  return dictPromise
    .then((res: TranslateDict) => dict = transform(res))
    .then(() => null);
}

function get(): TranslateLang {
  return storage.get('lang') as TranslateLang || 'en';
}

function set(value: TranslateLang): void {
  storage.set('lang', value);
  location.reload();
}

export function tkey(key: string, ...args: unknown[]): string {
  const value = dict[key] || '';

  if (value && args.length) {
    return value.replace(/\{(\d+)\}/g, (_, index: string) => {
      return args[+index] as string;
    });
  }

  return value;
}

export const language = {
  init,
  set,
  get,
}