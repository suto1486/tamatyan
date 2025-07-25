import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Select() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const file = searchParams.get('file') || '';
  const title = decodeURIComponent(searchParams.get('title') || '');
  const [yuruyuru, setYuruyuru] = useState(true); // ← ゆるゆるモード状態
  const isTashikata = title.includes('たしかた');
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#0000cc';
  }, []);

  const handleSelect = (mode: 'okeiko' | 'mondai') => {
    const targetTitle = `${title} ${mode === 'okeiko' ? 'おけいこ' : 'もんだい'}`;
    const hideText = mode === 'mondai' ? '1' : '0';
    const yuru = yuruyuru ? '1' : '0'; // ← クエリに追加
    navigate(`/practice?file=${file}&title=${encodeURIComponent(targetTitle)}&hide=${hideText}&yuru=${yuru}`);
  };

  

  return (
    <div style={{
      backgroundColor: '#0000cc',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      fontFamily: 'sans-serif'

    }}>
      <h1 style={{ color: '#ffffff', fontSize: '1.5rem' }}>{title}</h1>
    

      {/* ✅ きびしいチェックボックス（たしかた以外のときだけ表示） */}
{!isTashikata && (
  <label style={{ color: 'white', fontSize: '1rem' }}>
  <input
    type="checkbox"
    checked={!yuruyuru} // ← 逆転（true = きびしい）
    onChange={(e) => setYuruyuru(!e.target.checked)} // ← 逆転させる
    style={{ marginRight: '0.5em' }}
  />
  きびしい!!
</label>

)}


      <button onClick={() => handleSelect('okeiko')} style={buttonStyle('#0000cc')}>おけいこ</button>
      <button onClick={() => handleSelect('mondai')} style={buttonStyle('#cc0000')}>もんだい</button>

      <button onClick={() => navigate('/')} style={{
        padding: '8px 16px',
        fontSize: '1rem',
        borderRadius: '20px',
        border: '1px solid #000',
        backgroundColor: '#ffffff',
        color: '#000000',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px'
      }}>
        もどる
      </button>
    </div>
  );
}

const buttonStyle = (textColor: string) => ({
  padding: '12px 24px',
  fontSize: '1.2rem',
  borderRadius: '10px',
  border: '1px solid #000',
  backgroundColor: '#ffffff',
  color: textColor,
  fontWeight: 'bold',
  cursor: 'pointer'
});

export default Select;
