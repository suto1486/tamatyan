import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './firebaseConfig';

import Index from './pages/Index';
import Select from './pages/Select';
import Practice from './pages/Practice';
import Login from './pages/Login';
import Register from './pages/Register'; // ← 追加！

function App() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>読み込み中...</div>;

  return (
    <Routes>
      <Route path="/" element={user ? <Index /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> {/* ← 追加 */}
      <Route path="/select" element={user ? <Select /> : <Navigate to="/login" />} />
      <Route path="/practice" element={user ? <Practice /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

