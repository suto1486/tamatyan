import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const isGitHub = import.meta.env.MODE === 'production';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={isGitHub ? "/tamatyan" : "/"}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

