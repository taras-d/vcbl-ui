import { useEffect, useState } from "react";

import { EventTypes } from "@shared/interfaces";
import { events, language } from "@shared/utils";

export interface TranslateProps {
  _key: string;
}

export function Translate({ _key }: TranslateProps) {
  const [text, setText] = useState('');

  function translate(): void {
    language.translate(_key).then((res: string) => setText(res));
  }

  useEffect(() => {
    translate();
    return events.listen(EventTypes.languageChange, translate);
  }, []);

  return <>{text}</>;
}

export const tkey = (key: string) => <Translate _key={key} />;