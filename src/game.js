export function calculateResult(targetSeconds, elapsedMilliseconds) {
  const duration = targetSeconds * 1000;
  const elapsed = Math.max(0, elapsedMilliseconds);
  const remaining = Math.max(0, duration - elapsed);
  const expired = elapsed >= duration;
  return {
    expired,
    remainingSeconds: remaining / 1000,
    score: expired ? 0 : Math.round((elapsed / duration) * 100),
  };
}
