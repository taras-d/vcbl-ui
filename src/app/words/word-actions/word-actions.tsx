import { useEffect, useState } from 'react';

import { Modal, Button } from '@shared/ui';
import { Word, EventTypes } from '@shared/interfaces';
import { events, tkey } from '@shared/utils';
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
    return events.listen(EventTypes.showWordActions, (word: Word) => {
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
      onClose={handleClose}>
      <Button text={tkey('wordActions.edit')} onClick={() => setAction('edit')}/>
      <Button text={tkey('wordActions.translate')} onClick={() => window.open(word.translateLink)}/>
      <Button text={tkey('wordActions.searchImgs')} onClick={() => window.open(word.imagesLink)}/>
      <Button text={tkey('wordActions.delete')} onClick={() => setAction('delete')}/>
    </Modal>
  );
}
