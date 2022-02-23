import { useState } from 'react';

import { AppRoutes } from '@shared/enums';
import { history, listen } from '@shared/utils';

interface RouterProps {
  routes: {
    [key: string]: {
      render?: JSX.Element;
      redirect?: string;
      access?: 'auth' | 'unauth';
    }
  }
}

let init = false;

export function Router({ routes }: RouterProps) {
  if (!init) {
    listen('pushstate', () => setPath(location.pathname));
    listen('popstate', () => setPath(location.pathname));
    init = true;
  }

  const [path, setPath] = useState(location.pathname);
  const route = routes[path] || routes['*'];
  const loggedIn = !!localStorage['logged'];

  if (!route) {
    return null;
  }

  if (route.access === 'auth' && !loggedIn) {
    history.push(AppRoutes.Login);
    return null;
  }

  if (route.access === 'unauth' && loggedIn) {
    history.push(AppRoutes.Home);
    return null;
  }

  if (route.redirect) {
    history.push(route.redirect);
    return null;
  }

  return route.render;
}