import React, { useEffect, useState } from "react";

import { Button, Input } from "@shared/ui";
import './words-list-actions.less';

export interface WordsListActionsProps {
  onSearch: (value: string) => void;
  onAdd: () => void;
}

export function WordsListActions({ onSearch, onAdd }: WordsListActionsProps) {
  const [searchValue, setSearchValue] = useState<string>(null);

  useEffect(() => {
    if (searchValue === null) {
      return;
    }

    const timeoutId = setTimeout(() => onSearch(searchValue), 500);
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchValue(event.target.value);
  }

  return (
    <div className="words-list-actions">
      <Input placeholder="Search" onChange={handleSearchChange} />
      <Button text="Add" onClick={onAdd} />
    </div>
  );
}