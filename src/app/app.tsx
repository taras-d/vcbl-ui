import { Router } from '@shared/ui';
import { Routes } from '@shared/enums';
import { Login } from './login/login';

function Words() {
  return <>Words</>;
}

function Profile() {
  return <>Profile</>;
}

export function App() {
  const routes = {
    [Routes.Home]: {
      render: <Words/>,
      auth: true,
    },
    [Routes.Login]: {
      render: <Login/>,
      unauth: true,
    },
    [Routes.Profile]: {
      render: <Profile/>,
      auth: true,
    },
    [Routes.NotMatch]: {
      redirect: '/'
    }
  };

  return <Router routes={routes} />;
}