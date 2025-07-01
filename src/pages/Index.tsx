import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // firebase.ts の位置に応じて調整

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#0000cc';
  }, []);


    const buttons = [
      { label: '(1) たしかた', file: 'add.json', title: 'たしかた' },
      { label: '(2) ひきかた', file: 'sub.json', title: 'ひきかた' },
      { label: '(3) 5+', file: '5_add.json', title: '5+' },
      { label: '(4) 5-', file: '5_sub.json', title: '5-' },
      { label: '(5) 10(5~9)+', file: '10_5add.json', title: '10(5〜9)+' },
      { label: '(6) 10(5~9)-', file: '10_5sub.json', title: '10(5〜9)-' },
      { label: '(7) 10(1〜4)+', file: '10_1add.json', title: '10(1〜4)+' },
      { label: '(8) 10(1〜4)-', file: '10_1sub.json', title: '10(1〜4)-' },
      { label: '(9) 1〜4+', file: '1_4add.json', title: '1〜4+' },
      { label: '(10) 1〜4-', file: '1_4sub.json', title: '1〜4-' },
      { label: '(11) SP+', file: 'sp_add.json', title: 'SP+' },
      { label: '(12) SP-', file: 'sp_sub.json', title: 'SP-' },
      { label: '(13) チャレンジ1', file: 'cha_add.json', title: 'チャレンジ1' },
      { label: '(14) チャレンジ2', file: 'cha_sub.json', title: 'チャレンジ2' }
    ];
    
  

  const extraButtons = [
    { label: '(15) +50A', file: 'add_50A.json', title: '+50A' },
    { label: '(16) +50B', file: 'add_50B.json', title: '+50B' },
    { label: '(17) -50A', file: 'sub_50A.json', title: '-50A' },
    { label: '(18) -50B', file: 'sub_50B.json', title: '-50B' },
    { label: '(19) +100A', file: 'add_100A.json', title: '+100A' },
    { label: '(20) +100B', file: 'add_100B.json', title: '+100B' },
    { label: '(21) -100A', file: 'sub_100A.json', title: '-100A' },
    { label: '(22) -100B', file: 'sub_100B.json', title: '-100B' }
    
  ];

  const handleClick = (file: string, title: string) => {
    navigate(`/select?file=${file}&title=${encodeURIComponent(title)}`);
  };

  const handleLogout = async () => {
  try {
    await signOut(auth);
    window.location.href = "/login"; // ログインページに戻す
  } catch (error) {
    console.error("ログアウト失敗:", error);
  }
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

      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
  <button onClick={handleLogout} style={{
    padding: "0.5rem 1rem",
    backgroundColor: "#eee",
    border: "1px solid #aaa",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }}>
    ログアウト
  </button>
</div>
    </div>
  );
};

export default Index;

