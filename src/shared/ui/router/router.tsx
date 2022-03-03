import { useEffect, useState, useRef } from 'react';

import { history } from '@shared/utils';
export { Route } from './route';

interface RouterProps {
  routes: {
    [key: string]: JSX.Element;
  }
}

export function Router({ routes }: RouterProps) {
  const unlisten = useRef<() => void>();
  const [path, setPath] = useState(location.pathname);

  if (!unlisten.current) {
    unlisten.current = history.listen(() => setPath(location.pathname));
  }

  useEffect(() => unlisten.current, []);

  return routes[path] || routes['*'] || null;
}