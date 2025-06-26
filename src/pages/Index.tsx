import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#0000cc';
  }, []);

  const buttons = [
    { label: '①たしかた', file: 'add.json', title: 'たしかた' },
    { label: '②ひきかた', file: 'sub.json', title: 'ひきかた' },
    { label: '③5+', file: '5_add.json', title: '5+' },
    { label: '④5-', file: '5_sub.json', title: '5-' },
    { label: '⑤10(1〜4)+', file: '10_1add.json', title: '10(1〜4)+' },
    { label: '⑥10(1〜4)-', file: '10_1sub.json', title: '10(1〜4)-' },
    { label: '⑦1〜4+',file: '1_4add.json', title: '1〜4+' },
    { label: '⑧1〜4-', file: '1_4sub.json', title: '1〜4-' },
    { label: '⑨10(5~9)+', file: '10_5add.json', title: '10(5〜9)+' },
    { label: '⑩10(5~9)-', file: '10_5sub.json', title: '10(5〜9)-' },
    { label: '⑪SP+', file: 'sp_add.json', title: 'SP+' },
    { label: '⑫SP-', file: 'sp_sub.json', title: 'SP-' },
    { label: '⑬チャレンジ1', file: 'cha_add.json', title: 'チャレンジ1' },
    { label: '⑭チャレンジ2', file: 'cha_sub.json', title: 'チャレンジ2' }
  ];

  const extraButtons = [
    { label: '⑮+50A', file: 'add_50A.json', title: '+50A' },
    { label: '⑯+50B', file: 'add_50B.json', title: '+50B' },
    { label: '⑰-50A', file: 'sub_50A.json', title: '-50A' },
    { label: '⑱-50B', file: 'sub_50B.json', title: '-50B' },
    { label: '⑲+100A', file: 'add_100A.json', title: '+100A' },
    { label: '⑳+100B', file: 'add_100B.json', title: '+100B' },
    { label: '㉑-100A', file: 'sub_100A.json', title: '-100A' },
    { label: '㉒-100B', file: 'sub_100B.json', title: '-100B' }
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
      paddingTop: '0.5rem',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        fontSize: '1.4rem',
        textAlign: 'center',
        color: '#ffffff',
        marginBottom: '0.5rem'
      }}>
        ぽちたま
      </h1>

      {/* メインボタン群 */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0 1rem',
        maxWidth: '360px'
      }}>
        {buttons.map(({ label, file, title }) => (
          <button
            key={file}
            onClick={() => handleClick(file, title)}
            style={{
              padding: '8px',
              textAlign: 'left',
　　　　　　　　paddingLeft: '1em',

              fontSize: '0.85rem',
              borderRadius: '8px',
              border: '1px solid #ffffff',
              backgroundColor: '#ffffff',
              color: '#0000cc',
              fontWeight: 'bold',
              cursor: 'pointer',
              
              width: '140px'
            }}
          >
            {label}
          </button>
        ))}

        {/* 横線 */}
        <hr style={{ width: '100%', borderTop: '1px solid white', margin: '0rem 0' }} />

        {/* 追加ボタン群 */}
        {extraButtons.map(({ label, file, title }) => (
          <button
            key={file}
            onClick={() => handleClick(file, title)}
            style={{
              padding: '8px',
              textAlign: 'left',
　　　　　　　　paddingLeft: '1em',
              fontSize: '0.85rem',
              borderRadius: '8px',
              border: '1px solid #ffffff',
              backgroundColor: '#ffffff',
              color: '#0000cc',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '140px'
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

