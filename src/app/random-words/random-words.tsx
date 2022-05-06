import { useEffect, useState } from 'react';

import { Word, EventTypes, ApiResponse } from '@shared/interfaces';
import { Spinner, Button, Modal, NoData, Translate } from '@shared/ui';
import { events } from '@shared/utils';
import { wordsApi } from '@shared/api';
import { useAbortController, useTranslate } from '@shared/hooks';
import { WordsList } from '../words/words-list/words-list';
import { WordActions } from '../words/word-actions/word-actions';
import './random-words.less';

export function RandomWords() {
  const translate = useTranslate();
  const dataAbort = useAbortController();
  const [data, setData] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  function loadData(): void {
    dataAbort.abort();
    setLoading(true);
    wordsApi.getRandomWords(dataAbort.signal())
      .then((words: Word[]) => {
        setLoading(false);
        setData(words);
      })
      .catch((res: ApiResponse) => {
        if (res.aborted) {
          return;
        }
        
        if (res.status === 400) {
          Modal.alert({ text: translate('randomWords.notEnoughWords')})
        }
        setLoading(false);
      });
  }

  function handleWordDeleted(word: Word): void {
    setData(
      data.map((item: Word) => {
        return item._id === word._id ? { ...item, deleted: true } : item;
      })
    );
  }

  function handleWordEdited(word: Word): void {
    setData(data.map((item: Word) => item._id === word._id ? word : item));
  }

  function handleWordClick(word: Word): void {
    events.trigger(EventTypes.showWordActions, word);
  }

  function handleRefreshClick(): void {
    loadData();
  }

  function renderContent(): JSX.Element {
    if (!data.length) {
      return loading ? <Spinner /> : <NoData />;
    }

    return (
      <>
        <WordsList words={data} onWordClick={handleWordClick} />
        <div className="refresh">
          <Button
            loading={loading}
            text={<Translate value="randomWords.refresh" />}
            onClick={handleRefreshClick}
          />
        </div>
        <WordActions onDeleted={handleWordDeleted} onEdited={handleWordEdited} />
      </>
    );
  }

  return (
    <div className="random-words">
      {renderContent()}
    </div>
  );
}