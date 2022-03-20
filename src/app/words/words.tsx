import { useEffect, useState, useRef } from 'react';

import { wordsApi } from '@shared/api';
import { ApiResponse, Word, WordsListResponse, EventTypes } from '@shared/interfaces';
import { Button, Spinner } from '@shared/ui';
import { events } from '@shared/utils';
import { useAbortController } from '@shared/hooks';
import { WordsList } from './words-list/words-list'
import { WordActions } from './word-actions/word-actions';
import { WordCreate } from './word-create/word-create';
import './words.less';

export function Words() {
  const dataAbort = useAbortController();
  const skipRef = useRef(0);
  const [data, setData] = useState<Word[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const empty = data.length === 0;

  useEffect(() => {
    loadData();
  }, []);

  function loadData(): void {
    setLoading(true);

    wordsApi.getWords({ skip: skipRef.current }, dataAbort.signal())
      .then((res: WordsListResponse) => {
        setData([...data, ...res.data]);
        setTotal(res.total);
        setLoading(false);
      })
      .catch((res: ApiResponse) => {
        if (res.aborted) {
          return;
        }

        setLoading(false);
      });
  }

  function handleShowMoreClick(): void {
    skipRef.current = data.length;
    loadData();
  }

  function handleWordClick(word: Word): void {
    events.trigger(EventTypes.showWordActions, word);
  }

  function handleWordAddClick(): void {
    events.trigger(EventTypes.showWordCreate);
  }

  function handleWordEdited(word: Word): void {
    setData(data.map((item: Word) => item._id === word._id ? word : item));
  }

  function handleWordDeleted(word: Word): void {
    setData(data.filter((item: Word) => item !== word));
    setTotal(total - 1);
  }

  function handleWordCreated(created: Word[], updated: Word[]): void {
    const words = [...created, ...data];

    updated.forEach((word: Word) => {
      const index = words.findIndex((item: Word) => item._id === word._id);
      if (index !== -1) {
        words[index] = word;
      }
    });

    setData(words);
    setTotal(total + created.length);
  }

  return (
    <div className="words">
      <Button text="Add" onClick={handleWordAddClick} />

      {!empty && (
        <>
          <WordsList
            words={data}
            onWordClick={handleWordClick}
          />
          <WordActions
            onEdited={handleWordEdited}
            onDeleted={handleWordDeleted}
          />
        </>
      )}

      {loading && empty && <Spinner />}

      {!loading && empty && <div className="no-words">No words</div>}

      {total > data.length && (
        <Button className="show-more" text="Show more" loading={loading} onClick={handleShowMoreClick} />
      )}

      <WordCreate onCreated={handleWordCreated} />
    </div>
  );
}