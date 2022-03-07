import { Word } from '@shared/interfaces';
import { Modal } from '@shared/ui';

interface WordDelete {
  word: Word;
  onClose: () => void;
  onEdited: (newWord: Word) => void;
}

export function WordEdit({ word, onClose }: WordDelete) {
  return (
    <Modal
      open={true}
      header="Edit word"
      onClose={onClose}
    >
      Edit {word.text}
    </Modal>
  );
}