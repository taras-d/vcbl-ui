import { useTranslate } from '@shared/hooks';
import './translate.less';

export interface TranslateProps {
  value: string;
  replace?: unknown[];
}

export function Translate({ value, replace = [] }: TranslateProps) {
  const translate = useTranslate();
  return translate(value, ...replace);
}
