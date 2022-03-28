import { Word } from "@shared/interfaces";
import { classes } from "@shared/utils";
import './words-list.less';

interface WordProps {
  words: Word[];
  onWordClick: (word: Word) => void;
}

export function WordsList({ words, onWordClick }: WordProps) {
  function renderWord(word: Word): JSX.Element {
    const itemClassName = classes('word', { deleted: word.deleted });
    return (
      <div className={itemClassName} key={word._id}
        onClick={() => !word.deleted && onWordClick(word)}>
        <span className="word-text">{word.text}</span>
        {word.translation && <span className="word-translation">{' / '}{word.translation}</span>}
      </div>
    )
  }

  return words.length > 0 && (
    <div className="words-list">
      {words.map(renderWord)}
    </div>
  );
}