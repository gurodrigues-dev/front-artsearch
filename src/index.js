import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Context
import { LoadingContextProvider } from './context/LoadingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadingContextProvider>
      <App />
    </LoadingContextProvider>
  </React.StrictMode>
);

