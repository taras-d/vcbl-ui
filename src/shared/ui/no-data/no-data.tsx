import { Translate } from '../language/translate';
import './no-data.less';

export function NoData() {
  return (
    <div className="no-data">
      <Translate value="misc.noData" />
    </div>
  );
}