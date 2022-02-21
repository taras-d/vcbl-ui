import { useState } from 'react';

import { Routes } from '@shared/enums';
import { history } from '@shared/utils';

interface RouterProps {
  routes: {
    [key: string]: {
      render?: JSX.Element;
      redirect?: string;
      auth?: boolean;
      unauth?: boolean;
    }
  }
}

let init = false;

const isLoggedIn = false;

export function Router({ routes }: RouterProps) {
  const [path, setPath] = useState(location.pathname);

  if (!init) {
    window.addEventListener('pushstate', () => setPath(location.pathname));
    window.addEventListener('popstate', () => setPath(location.pathname));
    init = true;
  }

  const route = routes[path] || routes['*'];

  if (!route) {
    return null;
  }

  if (route.auth && !isLoggedIn) {
    history.push(Routes.Login);
    return null;
  }

  if (route.unauth && isLoggedIn) {
    history.push(Routes.Home);
    return null;
  }

  if (route.redirect) {
    history.push(route.redirect);
    return null;
  }

  return route.render;
}