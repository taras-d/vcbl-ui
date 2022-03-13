import React, { useState } from 'react';

import { Word } from '@shared/interfaces';
import { Modal, Button, Input } from '@shared/ui';
import { wordsApi } from '@shared/api';
import { useAbortController } from '@shared/hooks';
import './word-edit.less';

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
      className="word-edit"
      header="Edit word"
      onClose={onClose}
    >
      <form autoCapitalize="off" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-4">
            Text
          </div>
          <div className="col-8">
            <Input name="text" value={data.text} onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            Translation
          </div>
          <div className="col-8">
            <Input name="translation" value={data.translation} onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            Created
          </div>
          <div className="col-8">
            <Input name="created" defaultValue="" disabled />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            Updated
          </div>
          <div className="col-8">
            <Input name="translation" defaultValue="" disabled />
          </div>
        </div>
        <div className="edit-buttons">
          <Button text="Save" loading={loading} disabled={!valid}/>
        </div>
      </form>
    </Modal>
  );
}