import React from 'react';

type Props = {
  title: string;
  tens100On: boolean;
  setTens100On: (v: boolean) => void;
  unit100Index: number;
  setUnit100Index: (v: number) => void;
  tens5On: boolean;
  setTens5On: (v: boolean) => void;
  unit5On: boolean;
  setUnit5On: (v: boolean) => void;
  unit1Index: number;
  tens1Index: number;
  handleUnit1Click: (i: number) => void;
  handleTens1Click: (i: number) => void;
  handleSpaceClick: (id: string) => void;
  onBeadsUpdated: () => void; // ★追加
};

const SorobanUI: React.FC<Props> = ({
  title, tens100On, setTens100On, unit100Index, setUnit100Index,
  tens5On, setTens5On, unit5On, setUnit5On,
  unit1Index, tens1Index, handleUnit1Click, handleTens1Click,
  handleSpaceClick, onBeadsUpdated // ★追加
}) => {
  const scale = 1.0;

  const clickSpaces: [string, number, number][] = [
    ["space1", 8, 134], ["space2", 48, 134],
    ["space3", 96, 134], ["space4", 136, 134], ["space5", 176, 134], ["space6", 216, 134], ["space7", 256, 134],
    ["space8", 8, 72], ["space9", 48, 72],
    ["space10", 96, 72], ["space11", 136, 72], ["space12", 176, 72], ["space13", 216, 72], ["space14", 256, 72],
    ["space15", 8, 8], ["space16", 48, 8],
    ["space17", 96, 8], ["space18", 136, 8], ["space19", 176, 8], ["space20", 216, 8], ["space21", 256, 8]
  ];

  return (
    <div style={{ backgroundColor: '#0000cc', width: '100vw', height: `${304 * scale}px`, overflow: 'hidden', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: `${304 * scale}px`, overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '208px', height: '304px', transform: `scale(${scale})`, transformOrigin: 'top center' }}>
          <img src={`${import.meta.env.BASE_URL}images/frame_correct3.png`} alt="枠" style={{ position: 'absolute', top: 0, left: 0, width: '208px', height: '304px', objectFit: 'none', zIndex: 1 }} />

          {/* 100の位 5珠 */}
          <img src={`${import.meta.env.BASE_URL}images/${tens100On ? 'bead_on' : 'bead_off'}.png`}
               alt="tens100"
               style={{ position: 'absolute', top: tens100On ? '48px' : '8px', left: '8px', width: '64px', height: '40px', cursor: 'pointer', zIndex: 2 }}
               onClick={() => {
                 setTens100On(!tens100On);
                 onBeadsUpdated(); // ★
               }} />

          {/* 100の位 1珠 */}
          {[0, 1, 2, 3, 4].map(i => {
            const top = 96 + i * 40;
            const on = i < unit100Index;
            if (on) {
              return (
                <img key={`unit100_on_${i}`} src={`${import.meta.env.BASE_URL}images/bead_on.png`} alt="" style={{ position: 'absolute', top: `${top}px`, left: '8px', width: '64px', height: '40px', cursor: 'pointer', zIndex: 2 }}
                     onClick={() => {
                       setUnit100Index(i);
                       onBeadsUpdated(); // ★
                     }} />
              );
            } else if (i === unit100Index) {
              return null;
            } else {
              return (
                <img key={`unit100_off_${i}`} src={`${import.meta.env.BASE_URL}images/bead_off.png`} alt="" style={{ position: 'absolute', top: `${top}px`, left: '8px', width: '64px', height: '40px', cursor: 'pointer', zIndex: 2 }}
                     onClick={() => {
                       setUnit100Index(i);
                       onBeadsUpdated(); // ★
                     }} />
              );
            }
          })}

          {/* 10の位 5珠 */}
          <img src={`${import.meta.env.BASE_URL}images/${tens5On ? 'bead_on' : 'bead_off'}.png`}
               alt="tens5"
               style={{ position: 'absolute', top: tens5On ? '48px' : '8px', left: '72px', width: '64px', height: '40px', cursor: 'pointer', zIndex: 2 }}
               onClick={() => {
                 setTens5On(!tens5On);
                 onBeadsUpdated(); // ★
               }} />

          {/* 10の位 1珠 */}
          {[0, 1, 2, 3, 4].map(i => {
            const top = 96 + i * 40;
            const on = i < tens1Index;
            if (on) {
              return (
                <img key={`tens1_on_${i}`} src={`${import.meta.env.BASE_URL}images/bead_on.png`} alt="" style={{ position: 'absolute', top: `${top}px`, left: '72px', width: '64px', height: '40px', cursor: 'pointer', zIndex: 2 }}
                     onClick={() => {
                       handleTens1Click(i);
                       onBeadsUpdated(); // ★
                     }} />
              );
            } else if (i === tens1Index) {
              return null;
            } else {
              return (
                <img key={`tens1_off_${i}`} src={`${import.meta.env.BASE_URL}images/bead_off.png`} alt="" style={{ position: 'absolute', top: `${top}px`, left: '72px', width: '64px', height: '40px', cursor: 'pointer', zIndex: 2 }}
                     onClick={() => {
                       handleTens1Click(i);
                       onBeadsUpdated(); // ★
                     }} />
              );
            }
          })}

          {/* 1の位 5珠 */}
          <img src={`${import.meta.env.BASE_URL}images/${unit5On ? 'bead_on' : 'bead_off'}.png`}
               alt="unit5"
               style={{ position: 'absolute', top: unit5On ? '48px' : '8px', left: '134px', width: '64px', height: '40px', cursor: 'pointer', zIndex: 2 }}
               onClick={() => {
                 setUnit5On(!unit5On);
                 onBeadsUpdated(); // ★
               }} />

          {/* 1の位 1珠 */}
          {[0, 1, 2, 3, 4].map(i => {
            const top = 96 + i * 40;
            const on = i < unit1Index;
            if (on) {
              return (
                <img key={`unit1_on_${i}`} src={`${import.meta.env.BASE_URL}images/bead_on.png`} alt="" style={{ position: 'absolute', top: `${top}px`, left: '134px', width: '64px', height: '40px', cursor: 'pointer', zIndex: 2 }}
                     onClick={() => {
                       handleUnit1Click(i);
                       onBeadsUpdated(); // ★
                     }} />
              );
            } else if (i === unit1Index) {
              return null;
            } else {
              return (
                <img key={`unit1_off_${i}`} src={`${import.meta.env.BASE_URL}images/bead_off.png`} alt="" style={{ position: 'absolute', top: `${top}px`, left: '134px', width: '64px', height: '40px', cursor: 'pointer', zIndex: 2 }}
                     onClick={() => {
                       handleUnit1Click(i);
                       onBeadsUpdated(); // ★
                     }} />
              );
            }
          })}

          {/* タップ可能エリア */}
          {clickSpaces.map(([id, top, left]) => (
            <div key={id} id={id}
                 style={{
                   position: 'absolute',
                   top: `${top}px`,
                   left: `${left}px`,
                   width: '64px',
                   height: '40px',
                   backgroundColor: 'transparent',
                   zIndex: 10,
                   cursor: 'pointer',
                   pointerEvents: 'auto'
                 }}
                 onClick={(e) => {
                   handleSpaceClick(id);
                   setTimeout(() => {
                    if (typeof onBeadsUpdated === 'function') {
                      onBeadsUpdated();
                    }
                  }, 0);
                   const el = e.currentTarget;
                   el.style.pointerEvents = 'none';
                   const below = document.elementFromPoint(e.clientX, e.clientY);
                   if (below && below !== el) {
                     (below as HTMLElement).click();
                   }
                   setTimeout(() => {
                     el.style.pointerEvents = 'auto';
                   }, 0);
                 }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SorobanUI;
