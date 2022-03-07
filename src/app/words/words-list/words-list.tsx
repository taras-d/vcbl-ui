import { Word } from "@shared/interfaces";
import './words-list.less';

interface WordProps {
  words: Word[];
}

export function WordsList({ words }: WordProps) {
  return words.length > 0 && (
    <div className="words-list">
      {words.map((word: Word) =>
        <div className="word" key={word._id}>
          <span className="word-text">{word.text}</span>
          {word.translation && <span className="word-translation">{' / '}{word.translation}</span>}
        </div>
      )}
    </div>
  );
}