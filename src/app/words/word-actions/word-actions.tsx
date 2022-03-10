import { useEffect, useState } from 'react';

import { Modal, Button } from '@shared/ui';
import { Word } from '@shared/interfaces';
import { events } from '@shared/utils';
import { WordEdit } from './word-edit/word-edit';
import { WordDelete } from './word-delete/word-delete';
import './word-actions.less';

interface WordActionsProps {
  onEdited: (word: Word) => void;
  onDeleted: (word: Word) => void;
}

type ActionType = 'options' | 'edit' | 'delete';

export function WordActions({ onEdited, onDeleted}: WordActionsProps) {
  const [word, setWord] = useState<Word>(null);
  const [action, setAction] = useState<ActionType>(null);

  useEffect(() => {
    return events.listen('show-word-actions', (word: Word) => {
      setWord(word);
      setAction('options');
    });
  }, []);

  function handleClose(): void {
    setWord(null);
    setAction(null);
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
      header={word.text}
      onClose={handleClose}
    >
      <div className="options">
        <Button text="Edit word" onClick={() => setAction('edit')}/>
        <Button text="Translate" onClick={() => window.open(word.translateLink)}/>
        <Button text="Search images" onClick={() => window.open(word.imagesLink)}/>
        <Button text="Delete word" onClick={() => setAction('delete')}/>
      </div>
    </Modal>
  );
}
