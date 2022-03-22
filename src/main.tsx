import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.less';
import { App } from './app/app';
import { language } from '@shared/utils';

language.init().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
});
