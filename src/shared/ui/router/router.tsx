import { useEffect, useState } from 'react';

import { AppRoutes } from '@shared/enums';
import { history, currentUser } from '@shared/utils';

interface RouterProps {
  routes: {
    [key: string]: {
      render?: JSX.Element;
      redirect?: string;
      access?: 'auth' | 'unauth';
    }
  }
}

export function Router({ routes }: RouterProps) {
  useEffect(() => {
    return history.listen(() => setPath(location.pathname));
  }, []);

  const [path, setPath] = useState(location.pathname);
  const route = routes[path] || routes['*'];
  const loggedIn = !!currentUser.token;

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