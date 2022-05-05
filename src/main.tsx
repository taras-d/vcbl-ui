import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.less';
import { LanguageProvider } from '@shared/ui';
import { App } from './app/app';

ReactDOM.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
