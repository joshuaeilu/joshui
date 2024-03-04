import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppSettingsContext, AppSettingsProvider, defaultAppSettingsContext } from './components/hooks/AppSettingsContext';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AppSettingsProvider>
      <App />
    </AppSettingsProvider>
  </React.StrictMode>
);