import { useState, useLayoutEffect } from 'react';

import { events } from '@shared/utils';
export { Route } from './route';

interface RouterProps {
  routes: {
    [key: string]: JSX.Element;
  }
}

export function Router({ routes }: RouterProps) {
  const [path, setPath] = useState(location.pathname);

  useLayoutEffect(() => {
    return events.listen('history-change', () => setPath(location.pathname));
  }, []);

  return routes[path] || routes['*'] || null;
}