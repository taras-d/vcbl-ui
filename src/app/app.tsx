import { Router, Route, AlertContainer } from '@shared/ui';
import { AppRoutes } from '@shared/enums';
import { Login } from './login/login';
import { Words } from './words/words';
import { Profile } from './profile/profile';
import { Layout } from './layout/layout';

export function App() {
  return (
    <div className="app">
      <Router routes={{
        [AppRoutes.Login]: <Route access="unauth" render={<Login />} />,
        [AppRoutes.Home]: <Route access="auth" render={<Layout><Words /></Layout>} />,
        [AppRoutes.Profile]: <Route access="auth" render={<Layout><Profile /></Layout>} />,
        [AppRoutes.NotMatch]: <Route redirect={AppRoutes.Home} />,
      }} />
      <AlertContainer />
    </div>
  );
}