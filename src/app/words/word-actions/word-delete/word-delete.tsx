import { Word } from '@shared/interfaces';
import { Modal } from '@shared/ui';

interface WordDelete {
  word: Word;
  onClose: () => void;
  onDeleted: () => void;
}

export function WordDelete({ word, onClose }: WordDelete) {
  return (
    <Modal
      open={true}
      header="Delete word"
      onClose={onClose}
    >
      Delete {word.text}
    </Modal>
  );
}