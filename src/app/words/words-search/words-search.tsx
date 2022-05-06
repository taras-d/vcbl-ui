import React, { useEffect, useState, useRef } from "react";

import { CloseIcon, Input } from "@shared/ui";
import { useTranslate } from "@shared/hooks";
import './words-search.less';

export interface WordsSearchProps {
  onSearch: (value: string) => void;
}

export function WordsSearch({ onSearch }: WordsSearchProps) {
  const translate = useTranslate();
  const timeoutId = useRef<number>();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    return () => clearTimeout(timeoutId.current);
  }, []);

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value;
    setValue(inputValue);

    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => onSearch(inputValue.trim()), 500);
  }

  function handleClearClick(): void {
    setValue('');
    onSearch('');
  }

  return (
    <div className="words-search">
      <Input
        placeholder={translate('words.search')}
        value={value}
        onChange={handleValueChange}
      />
      {value && <div className="clear-search" onClick={handleClearClick} ><CloseIcon /></div>}
    </div>
);
}