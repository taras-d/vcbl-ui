import { tkey } from '@shared/utils';
import './no-data.less';

export function NoData() {
  return (
    <div className="no-data">{tkey('misc.noData')}</div>
  );
}