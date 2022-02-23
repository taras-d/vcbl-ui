import { Router, AlertContainer } from '@shared/ui';
import { AppRoutes } from '@shared/enums';
import { Login } from './login/login';
import { Words } from './words/words';
import { Profile } from './profile/profile';
import { Layout } from './layout/layout';

export function App() {
  return (
    <div className="app">
      <Router routes={{
        [AppRoutes.Login]: {
          render: <Login/>,
          access: 'unauth'
        },
        [AppRoutes.Home]: {
          render: <Layout render={<Words />} />,
          access: 'auth',
        },
        [AppRoutes.Profile]: {
          render: <Layout render={<Profile />} />,
          access: 'auth',
        },
        [AppRoutes.NotMatch]: {
          redirect: '/'
        }
      }} />
      <AlertContainer />
    </div>
  );
}