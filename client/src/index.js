import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalProvider } from './context/GlobalState';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
