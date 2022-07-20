import { storage } from '@shared/utils';

const themes = ['default', 'dark'];
const browserThemeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;

let current = getStoredTheme();

function getStoredTheme(): string {
  const val = storage.get('theme') as string;
  return themes.includes(val) ? val : themes[0]; 
}

function createLink(theme: string): void {
  let link = document.getElementById('theme') as HTMLLinkElement;
  link?.remove();

  link = document.createElement('link');
  link.id = 'theme';
  link.href = `theme/${theme}.css`;
  link.rel = 'stylesheet';
  link.onload = () => {
    const primaryColor = getComputedStyle(document.body).getPropertyValue('--browser-theme-color')?.trimStart();
    browserThemeColor.content = primaryColor || '';
  }
  document.head.append(link);
}

export const theme = {
  themes,
  init(): void {
    createLink(current);
  },
  change(theme: string): void {
    createLink(theme);
    current = theme;
    storage.set('theme', current);
  },
  get current(): string {
    return current;
  }
}
