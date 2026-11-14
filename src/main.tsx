import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import { PreferencesProvider } from './lib/preferences';
import { App } from './App';
import './styles.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PreferencesProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </PreferencesProvider>
  </React.StrictMode>,
);
