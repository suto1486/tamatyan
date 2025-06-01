import { useState } from 'react';
import './App.css';

function App() {
  const [unit5On, setUnit5On] = useState(false);
  const [tens5On, setTens5On] = useState(false);
  const [unit1Index, setUnit1Index] = useState(0);
  const [tens1Index, setTens1Index] = useState(0);

  const toggleTens5 = () => setTens5On(!tens5On);
  const toggleUnit5 = () => setUnit5On(!unit5On);
  const handleUnit1Click = (index) => setUnit1Index(index);
  const handleTens1Click = (index) => setTens1Index(index);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      backgroundColor: '#f5deb3', height: '100vh', justifyContent: 'center',
      padding: '1em'
    }}>
      <h2 style={{ fontSize: '1rem', marginBottom: '0.5em' }}>スマホ対応そろばん</h2>
      <h2 style={{ fontSize: '1rem', marginBottom: '0.5em' }}>スマホ対応そろばん</h2>
      <h2 style={{ fontSize: '1rem', marginBottom: '0.5em' }}>スマホ対応そろばん</h2>
      <div style={{
       position: 'relative',
       width: '188px',  // ← 完全にiPhone SE基準の50%
       aspectRatio: '145 / 304',
       marginTop: '50px',        // ← 追加：全体を下にずらす
      }}>
        <img
          src={`${import.meta.env.BASE_URL}images/frame_correct.png`}
          alt="枠"
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%', objectFit: 'contain', zIndex: 1
          }}
        />

        {/* tens5 */}
        <img
          src={`${import.meta.env.BASE_URL}images/${tens5On ? 'bead_on' : 'bead_off'}.png`}
          alt={`tens5_${tens5On ? 'on' : 'off'}`}
          style={{
            position: 'absolute', top: tens5On ? '15.8%' : '2.6%', left: '5.5%',
            width: '44%', height: '13%', cursor: 'pointer', zIndex: 2
          }}
          onClick={toggleTens5}
        />

        {/* unit5 */}
        <img
          src={`${import.meta.env.BASE_URL}images/${unit5On ? 'bead_on' : 'bead_off'}.png`}
          alt={`unit5_${unit5On ? 'on' : 'off'}`}
          style={{
            position: 'absolute', top: unit5On ? '15.8%' : '2.6%', left: '49.7%',
            width: '44%', height: '13%', cursor: 'pointer', zIndex: 2
          }}
          onClick={toggleUnit5}
        />

        {/* unit1 */}
        {[0, 1, 2, 3, 4].map((i) => {
          const top = 31.6 + i * 13;
          if (i < unit1Index) {
            return (
              <img
                key={`unit1_on_${i}`}
                src={`${import.meta.env.BASE_URL}images/bead_on.png`}
                alt={`unit1_on_${i}`}
                style={{
                  position: 'absolute', top: `${top}%`, left: '49.7%',
                  width: '44%', height: '13%', cursor: 'pointer', zIndex: 2
                }}
                onClick={() => handleUnit1Click(i)}
              />
            );
          } else if (i === unit1Index) {
            return null;
          } else {
            return (
              <img
                key={`unit1_off_${i}`}
                src={`${import.meta.env.BASE_URL}images/bead_off.png`}
                alt={`unit1_off_${i}`}
                style={{
                  position: 'absolute', top: `${top}%`, left: '49.7%',
                  width: '44%', height: '13%', cursor: 'pointer', zIndex: 2
                }}
                onClick={() => handleUnit1Click(i)}
              />
            );
          }
        })}

        {/* tens1 */}
        {[0, 1, 2, 3, 4].map((i) => {
          const top = 31.6 + i * 13;
          if (i < tens1Index) {
            return (
              <img
                key={`tens1_on_${i}`}
                src={`${import.meta.env.BASE_URL}images/bead_on.png`}
                alt={`tens1_on_${i}`}
                style={{
                  position: 'absolute', top: `${top}%`, left: '5.5%',
                  width: '44%', height: '13%', cursor: 'pointer', zIndex: 2
                }}
                onClick={() => handleTens1Click(i)}
              />
            );
          } else if (i === tens1Index) {
            return null;
          } else {
            return (
              <img
                key={`tens1_off_${i}`}
                src={`${import.meta.env.BASE_URL}images/bead_off.png`}
                alt={`tens1_off_${i}`}
                style={{
                  position: 'absolute', top: `${top}%`, left: '5.5%',
                  width: '44%', height: '13%', cursor: 'pointer', zIndex: 2
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

