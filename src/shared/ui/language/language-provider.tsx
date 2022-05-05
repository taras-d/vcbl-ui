import { useEffect, createContext, useState } from "react";

import { LanagugeDictionary } from '@shared/interfaces';
import { storage, flattenObject } from '@shared/utils';

export interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageContext = createContext<{
  languages: string[],
  current: string,
  dictionary: LanagugeDictionary,
  change: (code: string) => void,
}>(null);

const languages = ['en', 'uk'];

const cache: Record<string, Promise<LanagugeDictionary>> = {};

function loadLanguage(code: string): Promise<LanagugeDictionary> {
  if (!cache[code]) {
    cache[code] = fetch(`language/${code}.json`)
      .then((res: Response) => res.json())
      .then((res: LanagugeDictionary) => flattenObject(res) as LanagugeDictionary);
  }

  return cache[code];
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [current, setCurrent] = useState(() => {
    const code = storage.get('lang') as string;
    return languages.includes(code) ? code : languages[0];
  });

  const [dictionary, setDictionary] = useState<LanagugeDictionary>({});

  useEffect(() => {
    loadLanguage(current).then(setDictionary);
  }, [current]);

  function change(code: string): void {
    storage.set('lang', code);
    setCurrent(code);
    loadLanguage(code).then(setDictionary);
  }

  return (
    <LanguageContext.Provider value={{
      languages,
      current,
      dictionary,
      change,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}