import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Select from './pages/Select';
import Practice from './pages/Practice';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/select" element={<Select />} />
      <Route path="/practice" element={<Practice />} />
    </Routes>
  );
}

export default App;
