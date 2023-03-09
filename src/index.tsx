/*****************************************************************************
 * Import
 *****************************************************************************/
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'style/index.css';
import 'style/app.scss';
import App from './App';

/*****************************************************************************
 * Render
 *****************************************************************************/
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
