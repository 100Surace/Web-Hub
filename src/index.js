import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { ToastProvider } from 'react-toast-notifications';

ReactDOM.render(
  <BrowserRouter>
    <ToastProvider autoDismiss>
      <App />
    </ToastProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
