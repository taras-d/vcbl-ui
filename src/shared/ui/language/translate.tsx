import { useContext } from "react";

import { LanguageContext } from "./language-provider";
import './translate.less';

export interface TranslateProps {
  value: string;
  replace?: unknown[];
}

export function Translate({ value, replace }: TranslateProps) {
  const { dictionary } = useContext(LanguageContext);

  const text = dictionary[value];

  return text ? <>{text}</> : <span className="translate"></span>;
}