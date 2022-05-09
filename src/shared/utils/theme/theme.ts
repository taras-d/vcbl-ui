import { storage } from '@shared/utils';

const themes = ['default', 'dark'];

const linkEl = document.getElementById('theme') as HTMLLinkElement;

let current = getStoredTheme();

function getStoredTheme(): string {
  const val = storage.get('theme') as string;
  return themes.includes(val) ? val : themes[0]; 
}

function changeLink(theme: string): void {
  linkEl.href = `theme/${theme}.css`;
}

export const theme = {
  themes,
  init(): void {
    changeLink(current);
  },
  change(theme: string): void {
    current = theme;
    storage.set('theme', current);
    changeLink(current);
  },
  get current(): string {
    return current;
  }
}
