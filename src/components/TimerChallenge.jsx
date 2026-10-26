import { useEffect, useRef, useState } from 'react';
import ResultModal from './ResultModal.jsx';
import { calculateResult } from '../game.js';

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef(null);
  const startedAt = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [bestScore, setBestScore] = useState(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  function finishChallenge() {
    if (startedAt.current === null) return;
    const nextResult = calculateResult(targetTime, performance.now() - startedAt.current);
    clearTimeout(timer.current);
    startedAt.current = null;
    setIsRunning(false);
    setResult(nextResult);
    setBestScore((previous) => Math.max(previous ?? 0, nextResult.score));
  }

  function handleStart() {
    if (startedAt.current !== null || result) return;
    startedAt.current = performance.now();
    setIsRunning(true);
    timer.current = setTimeout(finishChallenge, targetTime * 1000);
  }

  return (
    <>
      {result && <ResultModal title={title} targetTime={targetTime} result={result} onClose={() => setResult(null)} />}
      <section className="challenge" aria-label={`${title}: ${targetTime} seconds`}>
        <h2>{title}</h2>
        <p className="challenge-time">{targetTime} second{targetTime === 1 ? '' : 's'}</p>
        <p>
          <button onClick={isRunning ? finishChallenge : handleStart} disabled={Boolean(result)}>
            {isRunning ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={isRunning ? 'active' : undefined} role="status">
          {isRunning ? 'Time is running… trust your timing!' : 'Ready when you are.'}
        </p>
        <p className="best-score">{bestScore === null ? 'No attempts yet' : `Session best: ${bestScore} / 100`}</p>
      </section>
    </>
  );
}
