'use strict';

(() => {
  const turns = 5;
  const fullCircle = Math.PI * 2;
  const angle = (value) => ((value % fullCircle) + fullCircle) % fullCircle;
  function chart(seed) {
    let state = seed >>> 0;
    const next = () => {
      state = (Math.imul(1664525, state) + 1013904223) >>> 0;
      return state / 4294967296;
    };
    return Array.from({ length: turns }, (_, index) => {
      const target = next() * fullCircle;
      const direction = next() < 0.5 ? -1 : 1;
      const travel = 3.55 + next() * 1.6;
      const firstCrossing = 1090 + next() * 275;
      const speed = (direction * travel) / firstCrossing;
      return {
        target,
        origin: target - direction * travel,
        speed,
        duration: firstCrossing + fullCircle / Math.abs(speed) + 280,
        radius: 0.52 - index * 0.047,
      };
    });
  }
  function beam(signal, elapsed) {
    return angle(signal.origin + elapsed * signal.speed);
  }
  function score(signal, elapsed) {
    if (elapsed < 0 || elapsed > signal.duration) return 0;
    const distance = Math.abs(
      angle(beam(signal, elapsed) - signal.target + Math.PI) - Math.PI
    );
    if (distance > signal.radius) return 0;
    return 40 + Math.round(60 * (1 - distance / signal.radius));
  }
  const rules = Object.freeze({ turns, chart, beam, score, fullCircle });
  if (typeof module !== 'undefined' && module.exports) module.exports = rules;
  else window.BeaconRules = rules;
})();
