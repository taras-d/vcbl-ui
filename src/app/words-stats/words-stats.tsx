import React, { useEffect, useState } from 'react';

import { Spinner, Select, NoData } from '@shared/ui';
import { wordsApi } from '@shared/api';
import { useAbortController } from '@shared/hooks';
import './words-stats.less';
import { ApiResponse } from '@shared/interfaces';

export function WordsStats() {
  const dataAbort = useAbortController();
  const [years, setYears] = useState<number[]>();
  const [activeYear, setActiveYear] = useState<number>();
  const [data, setData] = useState<number[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadYears();
  }, []);

  function loadYears(): void {
    wordsApi.getStatsYears(dataAbort.signal())
      .then((items: number[]) => {
        if (items?.length) {
          const active = items[0];
          setYears(items);
          setActiveYear(active);
          loadData(active);
        } else {
          setLoading(false);
        }
      })
      .catch((res: ApiResponse) => {
        if (!res.aborted) {
          setLoading(false);
        }
      });
  }

  function loadData(year: number): void {
    wordsApi.getStatsData(year, dataAbort.signal())
      .then((items: number[]) => {
        setData(items);
        setLoading(false);
      })
      .catch((res: ApiResponse) => {
        if (!res.aborted) {
          setLoading(false);
        }
      });
  }

  function handleYearChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const year = +event.target.value;
    setActiveYear(year);
    setLoading(true);
    loadData(year);
  }

  function renderContent(): JSX.Element {
    if (loading) {
      return <Spinner />;
    }

    if (!data) {
      return <NoData />;
    }

    return (
      <>
        <div className="year-select">
          <Select value={`${activeYear}`} onChange={handleYearChange}>
            {years.map((year: number) => <option value={year} key={year}>{year}</option>)}
          </Select>
        </div>

        <div>{JSON.stringify(data)}</div>
      </>
    );
  }

  return (
    <div className="words-stats">
      {renderContent()}
    </div>
  );
}