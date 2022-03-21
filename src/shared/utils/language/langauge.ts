import { storage, events } from '@shared/utils';
import { TranslateLang, TranslateDic, EventTypes } from '@shared/interfaces';

const map: Record<string, Promise<TranslateDic>> = {};

let lang: TranslateLang = storage.get('lang')  as TranslateLang || 'en';

function get(): TranslateLang {
  return lang;
}

function set(value: TranslateLang): void {
  lang = value;
  storage.set('lang', value);
  events.trigger(EventTypes.languageChange);
}

function translate(key: string): Promise<string> {
  let dict = map[lang];

  if (!dict) {
    map[lang] = dict = fetch(`language/${lang}.json`).then(res => res.json());
  }

  return dict.then((data: TranslateDic) => data[key]);
}

export const language = {
  get,
  set,
  translate,
}