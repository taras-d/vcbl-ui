import { useMemo } from "react";

import { useTranslate } from "@shared/hooks";
import './words-chart.less';

interface WordsChartProps {
  data: number[];
}

export function WordsChart({ data }: WordsChartProps) {
  const translate = useTranslate();
  const max = useMemo(() => Math.max(...data), [data]);

  return (
    <div className="words-chart">
      <ul className="month">
        {data.map((_, index: number) => 
          <li key={index}>{translate('misc.month')[index]}</li>
        )}
      </ul>
      <ul className="progress">
        {data.map((value: number, index: number) => {
          const width = 100 / max * value;
          return <li key={index} style={{ width: `${width}%`, opacity: width ? 1 : 0 }} />;
        })}
      </ul>
      <ul className="count">
        {data.map((value: number, index: number) =>
          <li key={index}>{value}</li>
        )}
      </ul>
    </div>
  );
}