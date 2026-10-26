import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ResultModal({ title, result, targetTime, onClose }) {
  const dialog = useRef(null);
  const headingId = useId();

  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    return () => element.close();
  }, []);

  return createPortal(
    <dialog ref={dialog} className="result-modal" aria-labelledby={headingId} onClose={() => {
      if (!dialog.current.open) onClose();
    }}>
      <p className="result-label">{title} challenge</p>
      <h2 id={headingId}>{result.expired ? 'Time’s up!' : 'Your score'}</h2>
      <p className="score"><strong>{result.score}</strong> / 100</p>
      <progress value={result.score} max="100" aria-label={`Score: ${result.score} out of 100`} />
      <p>The target was <strong>{targetTime} second{targetTime === 1 ? '' : 's'}.</strong></p>
      {result.expired ? (
        <p>You ran out of time. Try stopping just before the target.</p>
      ) : (
        <p>You stopped with <strong>{result.remainingSeconds.toFixed(2)} seconds left.</strong></p>
      )}
      <form method="dialog"><button>Play again</button></form>
    </dialog>,
    document.getElementById('modal'),
  );
}
