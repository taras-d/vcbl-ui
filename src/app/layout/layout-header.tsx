import React, { useEffect, useState } from 'react';

import { history, events, tkey } from '@shared/utils';
import { AppRoutes, EventTypes } from '@shared/interfaces';
import { Select } from '@shared/ui';
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
        <option value={AppRoutes.Home}>{tkey('header.vocabulary')}</option>
        <option value={AppRoutes.Random}>{tkey('header.randomWords')}</option>
        <option value={AppRoutes.Profile}>{tkey('header.profile')}</option>
      </Select>
    </div>
  );
}