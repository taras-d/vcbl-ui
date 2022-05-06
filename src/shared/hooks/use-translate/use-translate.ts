import { useContext } from "react";

import { LanguageContext } from "@shared/ui";

export function useTranslate() {
  const { dictionary } = useContext(LanguageContext);

  function translate(key: string, ...args: unknown[]): string {
    const value = dictionary[key] || '';

    if (value && args.length) {
      return value.replace(/\{(\d+)\}/g, (_, index: string) => {
        return args[+index] as string;
      });
    }

    return value;
  }

  return translate;
}
