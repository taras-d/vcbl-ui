import { useState } from 'react';

import { Modal, Button } from '@shared/ui';
import { Word } from '@shared/interfaces';
import { WordEdit } from './word-edit/word-edit';
import { WordDelete } from './word-delete/word-delete';
import './word-actions.less';

interface WordActionsProps {
  word: Word;
  onClose: () => void;
  onEdited: (newWord: Word) => void;
  onDeleted: () => void;
}

type ActionType = 'options' | 'edit' | 'delete';

export function WordActions({ word, onClose, onEdited, onDeleted}: WordActionsProps) {
  const [action, setAction] = useState<ActionType>('options');

  function handleClose(): void {
    setAction(null);
    onClose();
  }

  if (!word) {
    return null;
  }

  if (action === 'edit') {
    return <WordEdit word={word} onClose={handleClose} onEdited={onEdited} />
  }

  if (action === 'delete') {
    return <WordDelete word={word} onClose={handleClose} onDeleted={onDeleted} />;
  }

  return (
    <Modal
      className="word-actions"
      open={true}
      header={word.text}
      onClose={handleClose}
    >
      <Button text="Edit word" onClick={() => setAction('edit')} />
      <Button text="Delete word" onClick={() => setAction('delete')} />
      <Button text="Translate"/>
      <Button text="Search images"/>
    </Modal>
  );
}
