import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SorobanUI from '../SorobanUI';

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
  const [title, setTitle] = useState('そろばん');
  const [loading, setLoading] = useState(true);
  const [unit5On, setUnit5On] = useState(false);
  const [tens5On, setTens5On] = useState(false);
  const [tens100On, setTens100On] = useState(false);
  const [unit100Index, setUnit100Index] = useState(0);
  const [unit1Index, setUnit1Index] = useState(0);
  const [tens1Index, setTens1Index] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [pendingSimultaneous, setPendingSimultaneous] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const hideText = params.get('hide') === '1';

  const sorobanWrapperStyle = isFinished
    ? { pointerEvents: 'none' as const, opacity: 1 }
    : {};

  const applyNumberToSoroban = (num: number) => {
    const units = num % 10;
    const tens = Math.floor(num / 10) % 10;
    const hundreds = Math.floor(num / 100);
    setUnit5On(units >= 5);
    setUnit1Index(units >= 5 ? units - 5 : units);
    setTens5On(tens >= 5);
    setTens1Index(tens >= 5 ? tens - 5 : tens);
    setTens100On(hundreds >= 5);
    setUnit100Index(hundreds >= 5 ? hundreds - 5 : hundreds);
  };

  
  const [audioClear, setAudioClear] = useState<HTMLAudioElement | null>(null);
  const [audioCorrect, setAudioCorrect] = useState<HTMLAudioElement | null>(null);

useEffect(() => {
  const correct = new Audio(`${import.meta.env.BASE_URL}sounds/correct.mp3`);
  const clear = new Audio(`${import.meta.env.BASE_URL}sounds/clear.mp3`);
  correct.load();
  clear.load();
  setAudioCorrect(correct);
  setAudioClear(clear);
}, []);







const playSound = (audio: HTMLAudioElement | null, label: string) => {
  if (audio) {
    audio.currentTime = 0;
    audio.play()
      .then(() => console.log(`${label} 再生 OK`))
      .catch((e) => console.warn(`${label} 再生失敗`, e));
  }
};


  useEffect(() => {
    const file = params.get('file') || 'problems_5_add.json';
    const titleParam = params.get('title') || 'そろばん';
    setTitle(titleParam);

    const url = `${import.meta.env.BASE_URL}${file}?t=${Date.now()}`;
    setLoading(true);

    fetch(url)
      .then(res => res.json())
      .then((data: Problem[]) => {
        const fixed = data.map(p => ({
          ...p,
          text2: p.text2 ?? '\u00A0',
          text3: p.text3 ?? '\u00A0',
        }));
        for (let i = fixed.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [fixed[i], fixed[j]] = [fixed[j], fixed[i]];
        }
        setProblems(fixed);
        setCurrentProblem(fixed[0]);
      })
      .catch(e => console.error("読み込みエラー:", e))
      .finally(() => setLoading(false));
  }, [location.search]);

  const yuruMode = params.get('yuru') === '1'; // ← クエリから取得

  useEffect(() => {
    if (currentProblem) {
      applyNumberToSoroban(currentProblem.number);
    }
  }, [currentProblem]);

  useEffect(() => {
    if (problems.length > 0 && currentIndex < problems.length) {
      setCurrentProblem(problems[currentIndex]);
    }
  }, [currentIndex, problems]);

  const resetProblem = () => {
    setCurrentIndex(0);
    setCurrentStep(0);
    setIsFinished(false);
    setCorrectCount(0);
    setPendingSimultaneous([]);
    if (problems.length > 0) {
      const first = problems[0];
      setCurrentProblem(first);
      applyNumberToSoroban(first.number);
    }
  };

  const failOrReset = () => {
    const lowerTitle = title.trim().toLowerCase();
    const isTashikata = lowerTitle.includes('たしかた');
    const isYuruyuru = params.get('yuru') === '1'; // ← yuru=1 のときだけ「ゆるゆるモード」
  
    if (isTashikata) {
      // 「たしかた」のときは間違えても何もしない
      return;
    }
  
    if (!isYuruyuru) {
      alert('まちがいです（きびしいモード）');
      resetProblem();
    } else {
      alert('まちがいです（ゆるゆるモード）');
      if (currentProblem) {
        applyNumberToSoroban(currentProblem.number);
      }
      setCurrentStep(0);
      setPendingSimultaneous([]);
    }
  };
  
  
  
  
  

  const handleSpaceClick = (clickedId: string) => {
    if (isFinished || !currentProblem) return;
  
    const rawAnswers = currentProblem.answers;
    console.log("🧪 handleSpaceClick", { clickedId, currentStep, rawAnswers });
  
    // 順不同グループ構成
    let group: string[] = [];
    let i = currentStep;
    while (i < rawAnswers.length) {
      group.push(rawAnswers[i].replace("'", "").trim());
      if (!rawAnswers[i].endsWith("'")) break;
      i++;
    }
  
    const expectedSet = new Set(group);
  
    // ✅ 共通正解処理
    const handleCorrect = () => {
      setCorrectCount(prev => prev + 1);
      const nextIndex = currentIndex + 1;
  
      if (nextIndex < problems.length) {
        playSound(audioCorrect, "✅ 正解音");
      } else {
        console.log("🎉 クリア音 直接再生");
        if (audioClear) {
          setTimeout(() => {
            audioClear.currentTime = 0;
            audioClear.play().catch((e) => console.warn("再生エラー", e));
          }, 500); // ← この遅延で調整できます
        }
      }
  
      setTimeout(() => {
        if (nextIndex < problems.length) {
          setCurrentIndex(nextIndex);
          setCurrentStep(0);
        } else {
          setIsFinished(true);
          setCurrentProblem({ number: 0, text1: '', text2: '', text3: '', answers: [] });
        }
      }, 1000);
    };
  
    // ⭐ 順不同タップ
    if (group.length > 1) {
      if (!expectedSet.has(clickedId)) {
        setTimeout(() => failOrReset(), 10);
        return;
      }
  
      const updated = [...new Set([...pendingSimultaneous, clickedId])];
      setPendingSimultaneous(updated);
  
      const currentSet = new Set(updated);
      if ([...expectedSet].every(id => currentSet.has(id))) {
        const nextStep = currentStep + group.length;
        setCurrentStep(nextStep);
        setPendingSimultaneous([]);
  


        if (nextStep >= rawAnswers.length) {
          handleCorrect();
        }
      }
    }
  
    // ⭐ 順番タップ
    else {
      const expected = rawAnswers[currentStep].trim();
      if (clickedId === expected) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
  
        if (nextStep >= rawAnswers.length) {
          handleCorrect();
        }
      } else {
        setTimeout(() => failOrReset(), 10);
      }
    }
  };
  
  
  

  if (loading || !currentProblem) {
    return <div style={{ color: 'white', textAlign: 'center' }}>読み込み中...</div>;
  }

  return (
    <div style={{ backgroundColor: '#0000cc', minHeight: '100vh', width: '100vw', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
      <div style={{ paddingTop: '0px', paddingBottom: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.4rem', color: '#ffffff', margin: '0', fontWeight: 'bold' }}>{title}</h1>
        <div style={{ color: 'white', fontSize: '1rem', marginBottom: '5px' }}>
          {!isFinished ? `あと ${problems.length - currentIndex} 問` : 'ぜんぶできた！おめでとう！🎉'}
        </div>
        <h2 style={{ fontSize: '1.2rem', color: '#ffff33',  margin: '0 0 5px 0' }}>{currentProblem.text1}</h2>

        <div style={sorobanWrapperStyle}>
          <SorobanUI
            title={title}
            problems={problems}
            currentIndex={currentIndex}
            currentProblem={currentProblem}
            unit5On={unit5On}
            tens5On={tens5On}
            unit1Index={unit1Index}
            tens1Index={tens1Index}
            hideText={hideText}
            isFinished={isFinished}
            setUnit5On={setUnit5On}
            setTens5On={setTens5On}
            setUnit1Index={setUnit1Index}
            setTens1Index={setTens1Index}
            handleUnit1Click={setUnit1Index}
            handleTens1Click={setTens1Index}
            handleSpaceClick={handleSpaceClick}
            resetAll={resetProblem}
            tens100On={tens100On}
            setTens100On={setTens100On}
            unit100Index={unit100Index}
            setUnit100Index={setUnit100Index}
            
          />
        </div>

        {!hideText && (
         <>
         <h2
           style={{
             fontSize: '1rem',
             margin: '0.5em 0 0.2em 0', // 上に1em、下に0.2em
             color: '#ffffff',
           }}
         >
           {currentProblem.text2}
         </h2>
         <h2
           style={{
             fontSize: '1rem',
             margin: '0', // 上下とも余白なし（上のh2でコントロール済み）
             color: '#dddddd',
           }}
         >
           {currentProblem.text3}
         </h2>
       </>
       
        )}
      </div>

      <div style={{ position: 'fixed', bottom: '20px', right: '10px', zIndex: 1000 }}>
        <button
          onClick={() => window.history.back()}
          style={{ padding: '10px 20px', backgroundColor: '#fff', borderRadius: '20px', fontWeight: 'bold' }}
        >
          もどる
        </button>
      </div>

      <div style={{ position: 'fixed', bottom: '20px', left: '10px', zIndex: 1000 }}>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '10px 20px', backgroundColor: '#fff', borderRadius: '20px', fontWeight: 'bold' }}
        >
          トップ
        </button>
      </div>
    </div>
  );
}

export default Practice;
