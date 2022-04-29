import { storage, flattenObject } from '@shared/utils';
import { TranslateLang } from '@shared/interfaces';

declare global {
  interface Window {
    __lang: Promise<Record<string, string>>;
  }
}

let dict: Record<string, string>;

function init(): Promise<void> {
  const promise = window.__lang;
  delete window.__lang;
  return promise.then((res: Record<string, unknown>) => {
    dict = flattenObject(res) as Record<string, string>;
    return null;
  });
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