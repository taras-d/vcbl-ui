import React, { useState } from 'react';

import { Word } from '@shared/interfaces';
import { Modal, Button, Input } from '@shared/ui';
import { wordsApi } from '@shared/api';
import { useAbortController } from '@shared/hooks';

interface WordDelete {
  word: Word;
  onClose: () => void;
  onEdited: (newWord: Word) => void;
}

export function WordEdit({ word, onClose, onEdited }: WordDelete) {
  const updateAbort = useAbortController();
  const [data, setData] = useState<Word>(() => ({ ...word }));
  const [loading, setLoading] = useState(false);

  const valid = !!data.text?.trim();

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();

    if (!valid) {
      return;
    }

    setLoading(true);

    const req = {
      id: word._id,
      text: data.text,
      translation: data.translation
    };

    wordsApi.updateWord(req, updateAbort.signal())
      .then((result: Word) => {
        onClose();
        onEdited(result);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const target = event.target
    setData(values => {
      return { ...values, [target.name]: target.value };
    });
  }

  return (
    <Modal
      header={`Edit word - "${word.text}"`}
      onClose={onClose}
    >
      <form autoCapitalize="off" onSubmit={handleSubmit}>

        <Input name="text" value={data.text} onChange={handleChange} />

        <Input name="translation" value={data.translation} onChange={handleChange} />
        
        <Button text="Save" loading={loading} disabled={!valid}/>
      </form>
    </Modal>
  );
}