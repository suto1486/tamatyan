import { useState } from 'react';
import './App.css';

function App() {
  const [unit5On, setUnit5On] = useState(false);
const [tens5On, setTens5On] = useState(false); // ← これを追加！
const [unit1Index, setUnit1Index] = useState(0);
const [tens1Index, setTens1Index] = useState(0);

const toggleTens5 = () => {
  setTens5On(!tens5On);
};

  const toggleUnit5 = () => {
    setUnit5On(!unit5On);
  };

  const handleUnit1Click = (index: number) => {
    setUnit1Index(index);
  };
  const handleTens1Click = (index: number) => {
    setTens1Index(index);
  };
  
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      backgroundColor: '#f5deb3', height: '100vh', justifyContent: 'center'
    }}>
      <h2>そろばん（unit1も表示）</h2>

      <div style={{ position: 'relative', width: '145px', height: '304px' }}>
        <img src="/images/frame_correct.png" alt="枠" style={{
          position: 'absolute', width: '145px', height: '304px', top: 0, left: 0
        }} />
        {/* tens5 */}
        {!tens5On && (
          <img
            src="/images/bead_off.png"
            alt="tens5_off"
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              width: '64px',
              height: '40px',
              cursor: 'pointer',
            }}
            onClick={toggleTens5}
          />
        )}
        {tens5On && (
          <img
            src="/images/bead_on.png"
            alt="tens5_on"
            style={{
              position: 'absolute',
              top: '48px',
              left: '8px',
              width: '64px',
              height: '40px',
              cursor: 'pointer',
            }}
            onClick={toggleTens5}
          />
        )}

        {/* unit5 */}
        {!unit5On && (
          <img
            src="/images/bead_off.png"
            alt="unit5_off"
            style={{
              position: 'absolute', top: '8px', left: '72px',
              width: '64px', height: '40px', cursor: 'pointer'
            }}
            onClick={toggleUnit5}
          />
        )}
        {unit5On && (
          <img
            src="/images/bead_on.png"
            alt="unit5_on"
            style={{
              position: 'absolute', top: '48px', left: '72px',
              width: '64px', height: '40px', cursor: 'pointer'
            }}
            onClick={toggleUnit5}
          />
        )}

        {/* unit1（5つの珠） */}
        {[0, 1, 2, 3, 4].map((i) => {
          const top = 96 + i * 40;

          if (i < unit1Index) {
            return (
              <img
                key={i}
                src="/images/bead_on.png"
                alt={`unit1_on_${i}`}
                style={{
                  position: 'absolute',
                  top: `${top}px`,
                  left: '72px',
                  width: '64px',
                  height: '40px',
                  cursor: 'pointer',
                }}
                onClick={() => handleUnit1Click(i)}
              />
            );
          } else if (i === unit1Index) {
            return null; // 空白（表示しない）
          } else {
            return (
              <img
                key={i}
                src="/images/bead_off.png"
                alt={`unit1_off_${i}`}
                style={{
                  position: 'absolute',
                  top: `${top}px`,
                  left: '72px',
                  width: '64px',
                  height: '40px',
                  cursor: 'pointer',
                }}
                onClick={() => handleUnit1Click(i)}
              />
              
            );
          }
        })}

{/* tens1（5つの珠） */}
{[0, 1, 2, 3, 4].map((i) => {
  const top = 96 + i * 40;
  if (i < tens1Index) {
    return (
      <img
        key={`tens1_on_${i}`}
        src="/images/bead_on.png"
        alt={`tens1_on_${i}`}
        style={{
          position: 'absolute',
          top: `${top}px`,
          left: '8px',
          width: '64px',
          height: '40px',
          cursor: 'pointer',
        }}
        onClick={() => handleTens1Click(i)}
      />
    );
  } else if (i === tens1Index) {
    return null; // 空白（中央）
  } else {
    return (
      <img
        key={`tens1_off_${i}`}
        src="/images/bead_off.png"
        alt={`tens1_off_${i}`}
        style={{
          position: 'absolute',
          top: `${top}px`,
          left: '8px',
          width: '64px',
          height: '40px',
          cursor: 'pointer',
        }}
        onClick={() => handleTens1Click(i)}
      />
    );
  }
})}
                    </div> 
    </div>  
  );
}
export default App;
