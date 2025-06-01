import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Select from './pages/Select';
import Practice from './pages/Practice';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/select" element={<Select />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
