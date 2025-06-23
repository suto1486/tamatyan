import React, { useEffect } from 'react';

type Props = {
  title: string;
  isFinished: boolean;
  problems: any[];
  currentIndex: number;
  currentProblem: any;
  hideText: boolean;
  tens5On: boolean;
  unit5On: boolean;
  unit1Index: number;
  tens1Index: number;
  setTens5On: (v: boolean) => void;
  setUnit5On: (v: boolean) => void;
  handleUnit1Click: (i: number) => void;
  handleTens1Click: (i: number) => void;
  handleSpaceClick: (id: string) => void;
};

const SorobanUI: React.FC<Props> = ({
  title, isFinished, problems, currentIndex, currentProblem,
  hideText, tens5On, unit5On, unit1Index, tens1Index,
  setTens5On, setUnit5On, handleUnit1Click, handleTens1Click, handleSpaceClick
}) => {
  useEffect(() => {
    console.log("✅ SorobanUI コンポーネントがレンダリングされました");
  }, []);
  console.log("🎯 SorobanUI ファイル実行中");

  const scale = 1.1;

return (
  <div style={{
    backgroundColor: '#0000cc',
    width: '100%',
    fontFamily: 'sans-serif',
    display: 'flex',
    justifyContent: 'center',
  }}>
    <div style={{
      position: 'relative',
      width: `${145 * scale}px`,
      height: `${304 * scale}px`,
      transform: `scale(${scale})`,
      transformOrigin: 'top center',
    }}>
      {/* 枠 */}
      <img
        src={`${import.meta.env.BASE_URL}images/frame_correct.png`}
        alt="枠"
        style={{ position: 'absolute', top: 0, left: 0, width: '145px', height: '304px', objectFit: 'none', zIndex: 1 }}
      />

          {/* 上の5珠 */}
          <img
            src={`${import.meta.env.BASE_URL}images/${tens5On ? 'bead_on' : 'bead_off'}.png`}
            alt="tens5"
            style={{ position: 'absolute', top: tens5On ? '48px' : '8px', left: '8px', width: '64px', height: '40px', cursor: 'pointer', zIndex: 2 }}
            onClick={() => setTens5On(!tens5On)}
          />

          <img
            src={`${import.meta.env.BASE_URL}images/${unit5On ? 'bead_on' : 'bead_off'}.png`}
            alt="unit5"
            style={{ position: 'absolute', top: unit5On ? '48px' : '8px', left: '72px', width: '64px', height: '40px', cursor: 'pointer', zIndex: 2 }}
            onClick={() => setUnit5On(!unit5On)}
          />

          {/* unit1 */}
          {[0, 1, 2, 3, 4].map((i) => {
            const top = 96 + i * 40;
            const on = i < unit1Index;
            if (on) {
              return (
                <img
                  key={`unit1_on_${i}`}
                  src={`${import.meta.env.BASE_URL}images/bead_on.png`}
                  alt={`unit1_on_${i}`}
                  style={{ position: 'absolute', top: `${top}px`, left: '72px', width: '64px', height: '40px', cursor: 'pointer', zIndex: 2 }}
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
                  style={{ position: 'absolute', top: `${top}px`, left: '72px', width: '64px', height: '40px', cursor: 'pointer', zIndex: 2 }}
                  onClick={() => handleUnit1Click(i)}
                />
              );
            }
          })}

          {/* tens1 */}
          {[0, 1, 2, 3, 4].map((i) => {
            const top = 96 + i * 40;
            const on = i < tens1Index;
            if (on) {
              return (
                <img
                  key={`tens1_on_${i}`}
                  src={`${import.meta.env.BASE_URL}images/bead_on.png`}
                  alt={`tens1_on_${i}`}
                  style={{ position: 'absolute', top: `${top}px`, left: '8px', width: '64px', height: '40px', cursor: 'pointer', zIndex: 2 }}
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
                  style={{ position: 'absolute', top: `${top}px`, left: '8px', width: '64px', height: '40px', cursor: 'pointer', zIndex: 2 }}
                  onClick={() => handleTens1Click(i)}
                />
              );
            }
          })}

          {/* クリック可能エリア */}
          {[
            ["space1", 8, 72],
            ["space2", 48, 72],
            ["space3", 96, 72],
            ["space4", 136, 72],
            ["space5", 176, 72],
            ["space6", 216, 72],
            ["space7", 256, 72],
            ["space8", 8, 8],
            ["space9", 48, 8],
            ["space10", 96, 8],
            ["space11", 136, 8],
            ["space12", 176, 8],
            ["space13", 216, 8],
            ["space14", 256, 8],
          ].map(([id, top, left]) => (
            <div
              key={id}
              id={id}
              style={{
                position: 'absolute',
                top: `${top}px`,
                left: `${left}px`,
                width: `64px`,
                height: `40px`,
                backgroundColor: 'transparent',
                zIndex: 10,
                cursor: 'pointer',
                pointerEvents: 'auto',
              }}
              onClick={(e) => {
                handleSpaceClick(id);
                const el = e.currentTarget;
                el.style.pointerEvents = 'none';
                const below = document.elementFromPoint(e.clientX, e.clientY);
                if (below && below !== el) {
                  (below as HTMLElement).click();
                }
                setTimeout(() => {
                  el.style.pointerEvents = 'auto';
                }, 0);
              }}
            />
          ))}
        </div>
      </div>

  );
};

export default SorobanUI;
