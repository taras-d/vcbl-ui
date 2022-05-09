import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.less';
import { LanguageProvider } from '@shared/ui';
import { theme } from '@shared/utils';
import { App } from './app/app';

theme.init();

ReactDOM.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
