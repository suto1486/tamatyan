import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // ← 追加（クエリ取得用）

type Problem = {
  number: number;
  text1: string;
  text2: string;
  text3: string;
  answers: string[];
};

function Practice() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [title, setTitle] = useState('そろばん'); // ← ヘッダー表示用
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const hideText = params.get('hide') === '1';
  

  const [currentStep, setCurrentStep] = useState(0);
const [isFinished, setIsFinished] = useState(false);
const [correctCount, setCorrectCount] = useState(0);
const [unit5On, setUnit5On] = useState(false);
const [tens5On, setTens5On] = useState(false);
const [unit1Index, setUnit1Index] = useState(0);
const [tens1Index, setTens1Index] = useState(0);



  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const file = params.get('file') || 'problems_5_add.json'; // ← デフォルトファイル名
    const titleParam = params.get('title') || 'そろばん';       // ← デフォルトタイトル

    setTitle(titleParam); // ← ヘッダーに使う
    
    fetch(`${import.meta.env.BASE_URL}${file}`)
      .then(res => res.json())
      .then((data: Problem[]) => {
        const shuffled = [...data];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setProblems(shuffled);
        setCurrentProblem(shuffled[0]);
      })
      .catch(err => console.error("読み込みエラー", err));
  }, [location.search]);

  

  useEffect(() => {
    if (!currentProblem) return;
    const num = currentProblem.number;
    const units = num % 10;
    const tens = Math.floor(num / 10);
  
    setUnit5On(units >= 5);
    setUnit1Index(units >= 5 ? units - 5 : units);
    setTens5On(tens >= 5);
    setTens1Index(tens >= 5 ? tens - 5 : tens);
  }, [currentProblem]);
  

  useEffect(() => {
   // 🔧 修正前（NG: 範囲外でも代入される可能性）
if (problems.length > 0) {
  setCurrentProblem(problems[currentIndex]);
}

// ✅ 修正後（OK: 範囲外防止）
if (problems.length > 0 && currentIndex < problems.length) {
  setCurrentProblem(problems[currentIndex]);
}

  }, [currentIndex, problems]);
  

  const handleUnit1Click = (index: number) => setUnit1Index(index);
  const handleTens1Click = (index: number) => setTens1Index(index);

  const handleSpaceClick = (clickedId: string) => {
    if (!currentProblem || !currentProblem.answers) return;
  
    const expectedId = currentProblem.answers[currentStep]?.trim();
    const clicked = clickedId.trim();
  
    if (clicked === expectedId) {
      const nextStep = currentStep + 1;
  
     if (nextStep >= currentProblem.answers.length) {
  setCorrectCount((prev) => prev + 1);

  setTimeout(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < problems.length) {
      setCurrentIndex(nextIndex);
      setCurrentStep(0);
    } else {
      setIsFinished(true); 
      setCurrentProblem({
        number: 0,
        text1: '',
        text2: '',
        text3: '',
        answers: [] // ← これでクリック判定を無効化
      });
    }
  }, 800);
}

        else {
        // 次のステップへ進む（音は鳴らさない）
        setCurrentStep(nextStep);
      }
  


    } else {
      // ❌ 間違い → リセット
      setTimeout(() => {
        alert("まちがいです");
        window.location.reload();
      }, 100);
    }

  };
  


  return (
   <div style={{
  backgroundColor: '#0000cc',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  fontFamily: 'sans-serif'
}}>
{isFinished && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'transparent',
      zIndex: 999,
      pointerEvents: 'auto'
    }}
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
    }}
  />
)}

      {/* ヘッダー */}
      <div style={{
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '50px',
  backgroundColor: '#0000cc',
  color: 'yellow',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: '50px',
  zIndex: 1000
}}>
  {title}
</div>


      {/* 本体 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '60px'
      }}>

<div style={{ color: 'white', fontSize: '1.4rem', marginTop: '10px' }}>
  {!isFinished
    ? `あと ${problems.length - currentIndex} 問`
    : 'ぜんぶできた！おめでとう！🎉'}
</div>


{currentProblem && (
  <>
    {/* text1 は常に表示 */}
    <h2 style={{
      fontSize: '1.6rem',
      color: 'yellow',
      minHeight: '1.5em',
      margin: '0.5em'
    }}>
      {currentProblem.text1 || '\u00A0'}
    </h2>

    {/* text2/text3 は hideText に応じて非表示 */}
    {!hideText && (
      <>
        <h2 style={{
          fontSize: '1rem',
          color: 'white',
          minHeight: '1.5em',
          margin: '0.5em'
        }}>
          {currentProblem.text2 || '\u00A0'}
        </h2>

        <h2 style={{
          fontSize: '1rem',
          color: 'white',
          minHeight: '1.5em',
          margin: '0.5em'
        }}>
          {currentProblem.text3 || '\u00A0'}
        </h2>
      </>
    )}
  </>
)}





        <div style={{
          position: 'relative',
          width: '145px',
          height: '304px',
          marginTop: '10px'
        }}>
          {/* 枠 */}
          <img
            src={`${import.meta.env.BASE_URL}images/frame_correct.png`}
            alt="枠"
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '145px', height: '304px',
              objectFit: 'none', zIndex: 1
            }}
          />

          {/* tens5 */}
          <img
            src={`${import.meta.env.BASE_URL}images/${tens5On ? 'bead_on' : 'bead_off'}.png`}
            alt="tens5"
            style={{
              position: 'absolute', top: tens5On ? '48px' : '8px', left: '8px',
              width: '64px', height: '40px', cursor: 'pointer', zIndex: 2
            }}
            onClick={() => setTens5On(!tens5On)}
          />

          {/* unit5 */}
          <img
            src={`${import.meta.env.BASE_URL}images/${unit5On ? 'bead_on' : 'bead_off'}.png`}
            alt="unit5"
            style={{
              position: 'absolute', top: unit5On ? '48px' : '8px', left: '72px',
              width: '64px', height: '40px', cursor: 'pointer', zIndex: 2
            }}
            onClick={() => setUnit5On(!unit5On)}
          />

          {/* unit1 */}
          {[0, 1, 2, 3, 4].map((i) => {
            const top = 96 + i * 40;
            if (i < unit1Index) {
              return (
                <img
                  key={`unit1_on_${i}`}
                  src={`${import.meta.env.BASE_URL}images/bead_on.png`}
                  alt={`unit1_on_${i}`}
                  style={{
                    position: 'absolute', top: `${top}px`, left: '72px',
                    width: '64px', height: '40px', cursor: 'pointer', zIndex: 2
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
                    position: 'absolute', top: `${top}px`, left: '72px',
                    width: '64px', height: '40px', cursor: 'pointer', zIndex: 2
                  }}
                  onClick={() => handleUnit1Click(i)}
                />
              );
            }
          })}

          {/* tens1 */}
          {[0, 1, 2, 3, 4].map((i) => {
            const top = 96 + i * 40;
            if (i < tens1Index) {
              return (
                <img
                  key={`tens1_on_${i}`}
                  src={`${import.meta.env.BASE_URL}images/bead_on.png`}
                  alt={`tens1_on_${i}`}
                  style={{
                    position: 'absolute', top: `${top}px`, left: '8px',
                    width: '64px', height: '40px', cursor: 'pointer', zIndex: 2
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
                    position: 'absolute', top: `${top}px`, left: '8px',
                    width: '64px', height: '40px', cursor: 'pointer', zIndex: 2
                  }}
                  onClick={() => handleTens1Click(i)}
                />
              );
            }
          })}
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
].map(([id, top, left]) => {
  const isEnabled = currentProblem?.answers.includes(id); // 正解だけクリック可能

  return (
    <div
    key={id}
    id={id}
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
      handleSpaceClick(id); // まず正解判定
  
      // ↓ 一時的に pointerEvents を無効にして再度 click を送る
      const el = e.currentTarget;
      el.style.pointerEvents = 'none';
  
      const below = document.elementFromPoint(e.clientX, e.clientY);
      if (below && below !== el) {
        (below as HTMLElement).click(); // 👈 珠にclickを渡す
      }
  
      // pointerEvents を戻す（次のクリックに備える）
      setTimeout(() => {
        el.style.pointerEvents = 'auto';
      }, 0);
    }}
 
 
    />
  );

  
})}


{/* ← 左下 Top に もどる */}
<div
  style={{
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    zIndex: 1000
  }}
>
  <button
    onClick={() => window.location.href = '/'}
    style={{
      padding: '10px 20px',
      backgroundColor: '#ffffff',
      color: '#000000',
      border: '1px solid #000',
      borderRadius: '20px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }}
  >
    Top に もどる
  </button>
</div>

{/* → 右下 もどる */}
<div
  style={{
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000
  }}
>
  <button
    onClick={() => window.history.back()}
    style={{
      padding: '10px 20px',
      backgroundColor: '#ffffff',
      color: '#000000',
      border: '1px solid #000',
      borderRadius: '20px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }}
  >
    もどる
  </button>
</div>


        </div>
      </div>
    </div>
  );
}

export default Practice;

