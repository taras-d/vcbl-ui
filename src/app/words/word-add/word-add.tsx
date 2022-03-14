import React, { useEffect, useState, useMemo } from 'react';

import { Modal, Input, Button } from '@shared/ui';
import { events } from '@shared/utils';
import { Word } from '@shared/interfaces';
import './word-add.less';

type NewWord = Partial<Word>;

export function WordAdd() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState<NewWord[]>([
    { text: '', translation: '' },
    { text: '', translation: '' },
  ]);

  useEffect(() => {
    return events.listen('open-word-add', () => setOpen(true));
  }, []);

  const valid = useMemo(() => words.some(word => word.text.trim()), [words]);

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
    console.log(data);
  }

  function handleModalClose(): void {
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
            placeholder="text"
            disabled={loading}
            onChange={event => handleInputChange(event, index)}
            onFocus={() => handleInputFocus(index)}
          />
        </div>
        <div className="col-6">
          <Input
            value={word.translation}
            name="translation"
            placeholder="translation"
            disabled={loading}
            onChange={event => handleInputChange(event, index)}
            onFocus={() => handleInputFocus(index)}
          />
        </div>
        <div className="col-1">
          <Button 
            type="button" 
            text="x" onClick={() => handleDeleteClick(word)}
            disabled={loading || index === 0}
          />
        </div>
      </div>
    )
  }

  return open && (
    <Modal
      className="word-add"
      header="Word add"
      onClose={handleModalClose}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        {words.map(renderWord)}
        <div className="save-button">
          <Button text="Save" disabled={!valid} loading={loading}/>
        </div>
      </form>
    </Modal>
  )
}