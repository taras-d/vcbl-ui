import { useState, useLayoutEffect } from 'react';

import { events } from '@shared/utils';
import { EventTypes } from '@shared/enums';
export { Route } from './route';

interface RouterProps {
  routes: {
    [key: string]: JSX.Element;
  }
}

export function Router({ routes }: RouterProps) {
  const [path, setPath] = useState(location.pathname);

  useLayoutEffect(() => {
    return events.listen(EventTypes.historyChange, () => setPath(location.pathname));
  }, []);

  return routes[path] || routes['*'] || null;
}