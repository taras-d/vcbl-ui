import { useTranslate } from '@shared/hooks';
import './translate.less';

export interface TranslateProps {
  value: string;
  replace?: unknown[];
}

export function Translate({ value, replace = [] }: TranslateProps) {
  const translate = useTranslate();

  const text = translate(value, ...replace);

  return text ? <>{text}</> : <span className="translate">{text}</span>;
}
