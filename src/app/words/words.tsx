import { useEffect } from 'react';

import { wordsApi } from '@shared/api/words-api';
import './words.less';

export function Words() {
  useEffect(() => {
    wordsApi.getWords({ skip: 0, limit: 10 }).then(r => {
      console.log(r);
    })
  }, []);

  return (
    <div className="words">
      Words
    </div>
  );
}