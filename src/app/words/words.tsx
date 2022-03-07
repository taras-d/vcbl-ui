import { useEffect, useState, useRef } from 'react';

import { wordsApi } from '@shared/api/words-api';
import { ApiResponse, Word, WordsListResponse } from '@shared/interfaces';
import { Button, Modal, Spinner } from '@shared/ui';
import { useAbortController } from '@shared/hooks';
import { WordsList } from './words-list/words-list'
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

  return (
    <div className="words">
      <WordsList words={data} />
      {loading && !data.length && <Spinner />}
      {!loading && !data.length && (
        <div className="no-words">No words</div>
      )}
      {total > data.length && (
        <Button className="show-more" text="Show more" loading={loading} onClick={handleShowMoreClick} />
      )}
    </div>
  );
}