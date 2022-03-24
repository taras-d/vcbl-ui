import { storage } from '@shared/utils';
import { Theme } from '@shared/interfaces';

const themeLink = document.getElementById('theme') as HTMLLinkElement;

function get(): Theme {
  return storage.get('theme') as Theme || 'default';
}

function set(theme: Theme): void {
  storage.set('theme', theme);
  themeLink.href = `theme/${theme}.css`;
}

export const theme = {
  get,
  set,
}
