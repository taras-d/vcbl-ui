import React, { useEffect, useState, useMemo } from 'react';

import { Modal, Input, Button, CloseIcon } from '@shared/ui';
import { events, tkey } from '@shared/utils';
import { EventTypes, NewWord, ApiResponse, Word, WordCreateResponse } from '@shared/interfaces';
import { useAbortController } from '@shared/hooks';
import { wordsApi } from '@shared/api';
import './word-create.less';

export interface WordCreateProps {
  onCreated: (created: Word[], updated: Word[]) => void;
}

export function WordCreate({ onCreated }: WordCreateProps) {
  const abortCreate = useAbortController();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState<NewWord[]>(() => getInitialData());

  useEffect(() => {
    return events.listen(EventTypes.showWordCreate, () => setOpen(true));
  }, []);

  const valid = useMemo(() => words.some(word => word.text.trim()), [words]);

  function getInitialData(): NewWord[] {
    return [
      { text: '', translation: '' },
      { text: '', translation: '' },
    ];
  }

  function handleInputChange(event: React.SyntheticEvent, index: number): void {
    const target = event.target as HTMLInputElement;
    const data = [...words];
    data[index] = { ...data[index], [target.name]: target.value };
    setWords(data);
  }

  function handleInputFocus(index: number): void {
    if (index === words.length - 1) {
      setWords([...words, { text: '', translation: '' }]);
    }
  }

  function handleDeleteClick(word: NewWord): void {
    if (words.length > 1) {
      setWords(words.filter(item => item !== word));
    }
  }

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();

    if (!valid) {
      return;
    }

    setLoading(true);

    const data = words.filter(word => word.text.trim());
    wordsApi.createWord(data, abortCreate.signal())
      .then((res: WordCreateResponse) => {
        setWords(getInitialData());
        setLoading(false);
        setOpen(false);
        onCreated(res.created, res.updated);
      })
      .catch((res: ApiResponse) => {
        if (!res.aborted) {
          setLoading(false);
        }
      });
  }

  function handleModalClose(): void {
    abortCreate.abort();
    setLoading(false);
    setOpen(false);
  }

  function renderWord(word: NewWord, index: number): JSX.Element {
    return (
      <div className="row" key={index}>
        <div className="col-5">
          <Input
            value={word.text}
            name="text"
            placeholder={tkey('wordCreate.textHolder')}
            disabled={loading}
            onChange={event => handleInputChange(event, index)}
            onFocus={() => handleInputFocus(index)}
          />
        </div>
        <div className="col-6">
          <Input
            value={word.translation}
            name="translation"
            placeholder={tkey('wordCreate.translationHolder')}
            disabled={loading}
            maxLength={100}
            onChange={event => handleInputChange(event, index)}
            onFocus={() => handleInputFocus(index)}
          />
        </div>
        <div className="col-1">
          <Button
            className="remove-button"
            type="button" 
            text={<CloseIcon />}
            disabled={words.length < 2}
            onClick={() => handleDeleteClick(word)}
          />
        </div>
      </div>
    );
  }

  return open && (
    <Modal
      className="word-create"
      header={tkey('wordCreate.title')}
      onClose={handleModalClose}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        {words.map(renderWord)}
        <div className="save-button">
          <Button text={tkey('wordCreate.save')} disabled={!valid} loading={loading}/>
        </div>
      </form>
    </Modal>
  )
}