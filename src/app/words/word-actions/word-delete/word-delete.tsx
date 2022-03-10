
import { useState } from 'react';

import { Word } from '@shared/interfaces';
import { Modal, Button } from '@shared/ui';
import { useAbortController } from '@shared/hooks';
import { wordsApi } from '@shared/api';
import './word-delete.less';

interface WordDelete {
  word: Word;
  onClose: () => void;
  onDeleted: (word: Word) => void;
}

export function WordDelete({ word, onClose, onDeleted }: WordDelete) {
  const deleteAbort = useAbortController();
  const [loading, setLoading] = useState(false);

  function handleYesClick(): void {
    setLoading(true);

    wordsApi.deleteWord(word._id, deleteAbort.signal())
      .then(() => {
        onClose();
        onDeleted(word);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <Modal
      className="word-delete"
      header="Delete word"
      onClose={onClose}
    >
      <div className="delete-message">
        Are you sure you want to delete word "<b>{word.text}</b>"?
      </div>
      <div className="delete-buttons">
        <Button text="Yes" onClick={handleYesClick} loading={loading}/>
        <Button text="No" onClick={onClose} disabled={loading}/>
      </div>
    </Modal>
  );
}