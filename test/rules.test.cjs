'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { chart, score, beam, turns, fullCircle } = require('../rules.js');

test('both keepers receive exactly five reproducible signals', () => {
  assert.deepEqual(chart(8911), chart(8911));
  assert.notDeepEqual(chart(8911), chart(8912));
  assert.equal(chart(8911).length, turns);
});
test('every chart gives both keepers two opportunities to hit the centre', () => {
  for (let i = 0; i < 1000; i++) {
    for (const signal of chart(i)) {
      const first = (signal.target - signal.origin) / signal.speed;
      const second = first + fullCircle / Math.abs(signal.speed);
      assert.ok(first > 1000 && second < signal.duration);
      assert.equal(score(signal, first), 100);
      assert.equal(score(signal, second), 100);
      const edge = first + (signal.radius * 0.99) / Math.abs(signal.speed);
      assert.ok(score(signal, edge) >= 40 && score(signal, edge) <= 42);
      assert.equal(
        score(signal, first + (2 * signal.radius) / Math.abs(signal.speed)),
        0
      );
      assert.equal(score(signal, -1), 0);
      assert.equal(score(signal, signal.duration + 1), 0);
      assert.ok(beam(signal, first) >= 0 && beam(signal, second) < fullCircle);
    }
  }
});
test('the gates narrow across the watch and a full game finishes in under 30 seconds', () => {
  for (let i = 0; i < 1000; i++) {
    const stages = chart(i);
    assert.ok(stages.every((v, n) => !n || v.radius < stages[n - 1].radius));
    const duration = stages.reduce(
      (sum, s) => sum + s.duration,
      1550 + 4 * 650 + turns * 830
    );
    assert.ok(duration < 30000);
  }
});
