import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppSettingsContext, AppSettingsProvider, defaultAppSettingsContext } from './components/hooks/AppSettingsContext';
import { PlayerStateProvider } from './components/hooks/PlayerStateProvider';
import { TimerProvider } from './components/hooks/TimerProvider';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AppSettingsProvider>
      <PlayerStateProvider>
        <TimerProvider>
          <App />
        </TimerProvider>
      </PlayerStateProvider>
    </AppSettingsProvider>
  </React.StrictMode>
);
