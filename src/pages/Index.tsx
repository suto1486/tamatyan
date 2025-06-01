import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  // ✅ スクロール禁止と背景統一を強制（念のため）
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#0000cc';
  }, []);

  const buttons = [
    { label: '5+', file: '5_add.json', title: '5+' },
    { label: '5-', file: '5_sub.json', title: '5-' },
    { label: '10(1〜4)+', file: '10_1add.json', title: '10(1〜4)+' },
    { label: '10(1〜4)-', file: '10_1sub.json', title: '10(1〜4)-' },
    { label: '10(5~9)+', file: '10_5sub.json', title: '10(5〜9)+' }, // ✅ ファイル名逆修正
    { label: '10(5~9)-', file: '10_5add.json', title: '10(5〜9)-' },
    { label: 'SP+', file: 'sp_add.json', title: 'SP+' },
    { label: 'SP-', file: 'sp_sub.json', title: 'SP-' },
    { label: 'チャレンジ1', file: 'cha_add.json', title: 'チャレンジ1' },
    { label: 'チャレンジ2', file: 'cha_sub.json', title: 'チャレンジ2' }
  ];

  const handleClick = (file: string, title: string) => {
    navigate(`/select?file=${file}&title=${encodeURIComponent(title)}`);
  };

  return (
    <div style={{
      backgroundColor: '#0000cc',
      width: '100vw',
      height: '100vh',
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: '2rem',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        fontSize: '1.4rem',
        textAlign: 'center',
        color: '#ffffff',
        marginBottom: '1.5rem'
      }}>
        たまちゃん
      </h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.7rem',
        alignItems: 'center'
      }}>
        {buttons.map(({ label, file, title }) => (
          <button
            key={file}
            onClick={() => handleClick(file, title)}
            style={{
              padding: '8px 16px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ffffff',
              backgroundColor: '#ffffff',
              color: '#0000cc',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '160px'
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Index;
