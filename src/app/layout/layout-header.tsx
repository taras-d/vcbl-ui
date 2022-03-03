import React, { useEffect, useState } from 'react';

import { history } from '@shared/utils';
import './layout-header.less';
import { AppRoutes } from '@shared/enums';

export function LayoutHeader() {
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    return history.listen(() => setValue(location.pathname));
  }, []);

  function handleValueChange(event: React.SyntheticEvent): void {
    history.push((event.target as HTMLSelectElement).value);
  }

  return (
    <div className="layout-header">
      <select value={value} onChange={handleValueChange}>
        <option value={AppRoutes.Home}>Vocabulary</option>
        <option value={AppRoutes.Profile}>Profile</option>
      </select>
    </div>
  );
}