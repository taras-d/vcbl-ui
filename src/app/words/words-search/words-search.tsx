import React, { useEffect, useState, useRef } from "react";

import { Input } from "@shared/ui";

export interface WordsSearchProps {
  onSearch: (value: string) => void;
}

export function WordsSearch({ onSearch }: WordsSearchProps) {
  const firstChange = useRef(true);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (firstChange.current) {
      firstChange.current = false;
      return;
    }

    const id = setTimeout(() => onSearch(value.trim()), 500);
    return () => clearTimeout(id);
  }, [value]);

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setValue(event.target.value);
  }

  return (
    <Input
      className="words-search"
      placeholder="Search"
      value={value}
      onChange={handleValueChange}
    />
);
}