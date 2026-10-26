import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateResult } from './game.js';

test('stopping closer to the target earns a higher score', () => {
  assert.deepEqual(calculateResult(5, 4250), {
    expired: false, remainingSeconds: 0.75, score: 85,
  });
  assert.equal(calculateResult(5, 4950).score, 99);
});

test('the deadline and delayed callbacks both count as expired', () => {
  for (const elapsed of [5000, 5600, 60000]) {
    assert.deepEqual(calculateResult(5, elapsed), {
      expired: true, remainingSeconds: 0, score: 0,
    });
  }
});

test('each difficulty uses its own duration', () => {
  for (const target of [1, 5, 10, 15]) {
    assert.equal(calculateResult(target, target * 500).score, 50);
  }
  assert.equal(calculateResult(1, 0).score, 0);
});
