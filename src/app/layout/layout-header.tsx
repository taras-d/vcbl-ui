import React, { useEffect, useState } from 'react';

import { history, events } from '@shared/utils';
import './layout-header.less';
import { AppRoutes } from '@shared/enums';
import { Select } from '@shared/ui';

export function LayoutHeader() {
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    return events.listen('history-change', () => setValue(location.pathname));
  }, []);

  function handleValueChange(event: React.SyntheticEvent): void {
    history.push((event.target as HTMLSelectElement).value);
  }

  return (
    <div className="layout-header">
      <Select value={value} onChange={handleValueChange}>
        <option value={AppRoutes.Home}>Vocabulary</option>
        <option value={AppRoutes.Profile}>Profile</option>
      </Select>
    </div>
  );
}