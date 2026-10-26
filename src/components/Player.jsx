import { useRef, useState } from 'react';

export default function Player() {
  const playerName = useRef(null);
  const [enteredPlayerName, setEnteredPlayerName] = useState('unknown entity');

  function handleSubmit(event) {
    event.preventDefault();
    const name = playerName.current.value.trim();
    if (!name) {
      playerName.current.focus();
      return;
    }
    setEnteredPlayerName(name);
    playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2 aria-live="polite">Welcome, {enteredPlayerName}</h2>
      <form onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="player-name">Player name</label>
        <input ref={playerName} id="player-name" type="text" maxLength={40} placeholder="Your name" autoComplete="nickname" required />
        <button>Set Name</button>
      </form>
      <p className="instructions">Start a challenge, count in your head, and stop just before time runs out.</p>
      <p className="instructions">The closer you get, the higher your score. Running out of time scores 0.</p>
    </section>
  );
}
