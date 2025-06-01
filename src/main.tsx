import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from './pages/Index';
import Select from './pages/Select';
import Practice from './pages/Practice';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/select" element={<Select />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

