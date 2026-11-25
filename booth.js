'use strict';
(() => {
  const { turns, chart, score, beam } = window.BeaconRules;
  const el = (id) => document.getElementById(id);
  const flashes = Array.from(document.querySelectorAll('.flash'));
  const lanes = Array.from(document.querySelectorAll('.lane'));
  const requestedCourse =
    new URLSearchParams(location.search).get('course') || '';
  const course = /^[0-9a-f]{8}$/i.test(requestedCourse)
    ? requestedCourse.toLowerCase()
    : null;
  const recordKey = course
      ? 'witchlight-course-v1-' + course
      : 'witchlight-regatta-best-v1',
    endTimeout = 25000,
    hold = 830;
  let record = 0,
    mode = 2,
    phase = 'lobby',
    signals = [],
    turn = 0,
    shots = [],
    totals = [],
    history = [],
    startAt = 0,
    frame = 0,
    endTimer = 0,
    endedAt = 0;
  try {
    const stored = Number(localStorage.getItem(recordKey));
    if (Number.isInteger(stored) && stored >= 0 && stored <= 500)
      record = stored;
  } catch {}
  function show(area) {
    for (const id of ['lobby', 'match', 'end']) el(id).hidden = area !== id;
  }
  function showRecord() {
    el('record').textContent =
      (course ? 'Course best · ' : 'Booth best · ') + record;
  }
  function lobby() {
    cancelAnimationFrame(frame);
    clearTimeout(endTimer);
    phase = 'lobby';
    show('lobby');
    el('duel').focus({ preventScroll: true });
  }
  function launch(players) {
    cancelAnimationFrame(frame);
    clearTimeout(endTimer);
    mode = players;
    const seed = course
      ? Number.parseInt(course, 16)
      : crypto.getRandomValues(new Uint32Array(1))[0];
    signals = chart(seed);
    turn = 0;
    totals = Array(mode).fill(0);
    history = [];
    lanes[1].hidden = mode === 1;
    for (let i = 0; i < mode; i++) {
      el('score' + i).textContent = '0';
      flashes[i].disabled = true;
    }
    show('match');
    nextTurn(performance.now());
    el('signal').setAttribute('tabindex', '-1');
    el('signal').focus({ preventScroll: true });
    tick();
  }
  function nextTurn(now) {
    const pause = turn === 0 ? 1550 : 650;
    phase = 'ready';
    startAt = now + pause;
    shots = Array(mode).fill(null);
    el('signal').textContent = 'Signal ' + (turn + 1) + ' / ' + turns;
    el('phase').textContent = 'Stand by';
    el('instructions').textContent =
      'Find the gold gate. The beam starts in a moment.';
    for (let i = 0; i < mode; i++) {
      el('feedback' + i).textContent = '';
      flashes[i].disabled = true;
    }
  }
  function latch(i, now) {
    if (phase !== 'live' || i >= mode || shots[i] !== null) return;
    const elapsed = now - startAt,
      signal = signals[turn];
    if (elapsed < 0 || elapsed >= signal.duration) return;
    const points = score(signal, elapsed);
    shots[i] = { elapsed, points };
    totals[i] += points;
    el('score' + i).textContent = totals[i];
    el('feedback' + i).textContent =
      points === 0
        ? 'Outside the gate'
        : (points >= 90 ? 'True bearing' : 'Ship guided') + '  +' + points;
    flashes[i].disabled = true;
    if (shots.every((s) => s !== null)) closeTurn(now);
  }
  function closeTurn(now) {
    phase = 'hold';
    endedAt = now;
    el('phase').textContent = 'Signal logged';
    el('instructions').textContent =
      turn + 1 === turns
        ? 'The harbour log is ready.'
        : 'A new ship is approaching.';
    for (let i = 0; i < mode; i++) {
      if (shots[i] === null) {
        shots[i] = { elapsed: signals[turn].duration, points: 0 };
        el('feedback' + i).textContent = 'No flash';
      }
      flashes[i].disabled = true;
    }
    history.push(shots.map((s) => s.points));
  }
  function finish() {
    phase = 'end';
    let best = Math.max(...totals);
    if (best > record) {
      record = best;
      try {
        localStorage.setItem(recordKey, String(record));
      } catch {}
      showRecord();
    }
    show('end');
    el('verdict').textContent =
      mode === 1
        ? 'Watch complete'
        : totals[0] === totals[1]
        ? 'A shared watch'
        : totals[0] > totals[1]
        ? 'West keeper wins'
        : 'East keeper wins';
    el('tally').textContent =
      mode === 1
        ? 'West keeper · ' + totals[0] + ' / 500'
        : 'West ' + totals[0] + '   /   East ' + totals[1];
    document.querySelector('th.east').hidden = mode === 1;
    const log = el('log');
    log.replaceChildren();
    history.forEach((scores, index) => {
      const row = log.insertRow();
      for (const value of [index + 1, ...scores])
        row.insertCell().textContent = value;
    });
    el('resetNote').textContent =
      'The booth returns to crew selection in 25 seconds.';
    el('again').focus({ preventScroll: true });
    endTimer = setTimeout(lobby, endTimeout);
  }
  function tick() {
    const now = performance.now();
    let elapsed = Math.max(0, now - startAt);
    if (phase === 'ready' && now >= startAt) {
      phase = 'live';
      el('phase').textContent = 'Lanterns live';
      el('instructions').textContent = 'Flash when the mint beam crosses gold.';
      for (let i = 0; i < mode; i++) flashes[i].disabled = false;
    }
    if (phase === 'live' && elapsed >= signals[turn].duration) closeTurn(now);
    if (phase === 'hold' && now - endedAt >= hold) {
      if (turn + 1 === turns) {
        finish();
        return;
      }
      turn++;
      nextTurn(now);
      elapsed = 0;
    }
    for (let i = 0; i < mode; i++) {
      const at = shots[i] === null ? elapsed : shots[i].elapsed;
      window.BeaconArt.scope(
        el('scope' + i),
        signals[turn],
        beam(signals[turn], at),
        shots[i] !== null
      );
    }
    frame = requestAnimationFrame(tick);
  }
  el('solo').onclick = () => launch(1);
  el('duel').onclick = () => launch(2);
  el('again').onclick = () => launch(mode);
  el('home').onclick = lobby;
  flashes.forEach((b, i) => {
    b.onpointerdown = (e) => {
      if (e.isPrimary || e.pointerType === 'touch') {
        e.preventDefault();
        latch(i, performance.now());
      }
    };
    b.onclick = () => latch(i, performance.now());
  });
  document.addEventListener('keydown', (e) => {
    if (e.repeat || e.altKey || e.metaKey || e.ctrlKey) return;
    const key = e.key.toLowerCase();
    const i = key === 'a' ? 0 : key === 'l' ? 1 : -1;
    if (i >= 0 && (phase === 'live' || phase === 'ready')) {
      e.preventDefault();
      latch(i, performance.now());
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && phase !== 'lobby') lobby();
  });
  if (course)
    el('courseHint').textContent =
      'Course ' +
      course.toUpperCase() +
      ' · The same five signals for every crew';
  window.BeaconArt.poster(el('poster'));
  showRecord();
})();
