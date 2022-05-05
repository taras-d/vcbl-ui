import React, { useEffect, useState } from 'react';

import { history, events } from '@shared/utils';
import { AppRoutes, EventTypes } from '@shared/interfaces';
import { Select, Translate } from '@shared/ui';
import './layout-header.less';

export function LayoutHeader() {
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    return events.listen(EventTypes.historyChange, () => setValue(location.pathname));
  }, []);

  function handleValueChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    history.push(event.target.value);
  }

  return (
    <div className="layout-header">
      <Select value={value} onChange={handleValueChange}>
        <option value={AppRoutes.Home}>
          <Translate value="header.vocabulary" />
        </option>
        <option value={AppRoutes.Random}>
          <Translate value="header.randomWords" />
        </option>
        <option value={AppRoutes.Stats}>
          <Translate value="header.stats" />
        </option>
        <option value={AppRoutes.Profile}>
          <Translate value="header.profile" />
        </option>
      </Select>
    </div>
  );
}