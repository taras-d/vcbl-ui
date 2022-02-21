import { Router } from '@shared/ui';
import { Routes } from '@shared/enums';

function Words() {
  return <>Words</>;
}

function Login() {
  return <>Login</>;
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

  return (
    <Router routes={routes} />
  )
}