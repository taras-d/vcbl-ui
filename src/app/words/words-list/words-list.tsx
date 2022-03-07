import { Word } from "@shared/interfaces";
import './words-list.less';

interface WordProps {
  words: Word[];
  onWordClick: (word: Word) => void;
}

export function WordsList({ words, onWordClick }: WordProps) {
  function renderWord(word: Word): JSX.Element {
    return (
      <div className="word" key={word._id} onClick={() => onWordClick(word)}>
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