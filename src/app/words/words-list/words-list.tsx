import { Word } from "@shared/interfaces";
import { classes, escapeRegex } from "@shared/utils";
import './words-list.less';

interface WordProps {
  words: Word[];
  highlight?: string;
  onWordClick: (word: Word) => void;
}

function wrapHighlight(value: string, highlight: string): string {
  if (!value) {
    return value;
  }

  const re = new RegExp(escapeRegex(highlight), 'ig');
  return value.replace(re, '<span class="highlight">$&</span>');
}

export function WordsList({ words, highlight, onWordClick }: WordProps) {
  function renderWord(word: Word): JSX.Element {
    const itemClassName = classes('word', { deleted: word.deleted });

    let { text, translation } = word;

    if (highlight) {
      text = wrapHighlight(text, highlight);
      translation = wrapHighlight(translation, highlight);
    }

    return (
      <div className={itemClassName} key={word._id}
        onClick={() => !word.deleted && onWordClick(word)}>
        <span className="word-text" dangerouslySetInnerHTML={{ __html: text }} />
        {translation && (
          <span className="word-translation">
            {' / '}
            <span dangerouslySetInnerHTML={{ __html: translation }} />
          </span>
        )}
      </div>
    )
  }

  return words.length > 0 && (
    <div className="words-list">
      {words.map(renderWord)}
    </div>
  );
}