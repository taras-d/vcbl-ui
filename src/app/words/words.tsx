import { useEffect, useState, useRef } from 'react';

import { wordsApi } from '@shared/api/words-api';
import { ApiResponse, Word, WordsListResponse } from '@shared/interfaces';
import { Button, Spinner } from '@shared/ui';
import { events } from '@shared/utils';
import { useAbortController } from '@shared/hooks';
import { WordsList } from './words-list/words-list'
import { WordActions } from './word-actions/word-actions';
import './words.less';

const limit = 15;

export function Words() {
  const dataAbort = useAbortController();
  const skipRef = useRef(0);
  const [data, setData] = useState<Word[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  function loadData(): void {
    setLoading(true);

    wordsApi.getWords({
      skip: skipRef.current,
      limit,
      signal: dataAbort.signal(),
    })
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
    events.trigger('show-word-actions', word);
  }

  function handleWordEdited(newWord: Word): void {
    console.log('edited', newWord);
  }

  function handleWordDeleted(word: Word): void {
    console.log('deleted', word);
  }

  return (
    <div className="words">
      <WordsList
        words={data}
        onWordClick={handleWordClick}
      />
      {loading && !data.length && <Spinner />}
      {!loading && !data.length && (
        <div className="no-words">No words</div>
      )}
      {total > data.length && (
        <Button className="show-more" text="Show more" loading={loading} onClick={handleShowMoreClick} />
      )}

      <WordActions
        onEdited={handleWordEdited}
        onDeleted={handleWordDeleted}
      />
    </div>
  );
}