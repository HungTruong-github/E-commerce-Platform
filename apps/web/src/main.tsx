import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from '@/app/providers/app-provider';
import { AppRouter } from '@/app/router';
import '@/styles/globals.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </React.StrictMode>,
  );
}
