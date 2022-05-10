import { useEffect, useState } from 'react';

import { AppRoutes } from '@shared/interfaces';
import { history, storage } from '@shared/utils';

interface RouteProps {
  render?: JSX.Element;
  redirect?: string;
  access?: 'auth' | 'unauth';
}

export function Route({ render, redirect, access }: RouteProps) {
  const [node, setNode] = useState<JSX.Element>(null);

  useEffect(() => {
    const loggedIn = !!storage.get('token');

    if (redirect) {
      history.push(redirect);
    } else if (access === 'auth' && !loggedIn) {
      history.push(AppRoutes.Login);
    } else if (access === 'unauth' && loggedIn) {
      history.push(AppRoutes.Home);
    } else {
      setNode(render);
    }
  }, [render, redirect, access]);

  return node;
}