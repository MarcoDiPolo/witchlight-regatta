'use strict';
(() => {
  const teal = '#86d3b6',
    gold = '#edc06a',
    paper = '#f0e7c7',
    dark = '#11232a';
  function shape(c, points, fill, edge, width = 1) {
    c.beginPath();
    points.forEach(([x, y], i) => (i === 0 ? c.moveTo(x, y) : c.lineTo(x, y)));
    if (fill) {
      c.closePath();
      c.fillStyle = fill;
      c.fill();
    }
    if (edge) {
      c.strokeStyle = edge;
      c.lineWidth = width;
      c.stroke();
    }
  }
  function arc(c, x, y, r, start, end, color, width) {
    c.beginPath();
    c.arc(x, y, r, start, end);
    c.strokeStyle = color;
    c.lineWidth = width;
    c.stroke();
  }
  function lighthouse(c, x, base, scale) {
    c.save();
    c.translate(x, base);
    c.scale(scale, scale);
    shape(
      c,
      [
        [-47, 0],
        [-23, -19],
        [-15, -113],
        [15, -113],
        [25, -16],
        [49, 0],
      ],
      '#c9d9b9',
      '#243d39',
      2
    );
    shape(
      c,
      [
        [3, -112],
        [16, -112],
        [25, -16],
        [8, -15],
      ],
      '#566e60'
    );
    shape(
      c,
      [
        [-19, -67],
        [18, -80],
        [21, -57],
        [-21, -43],
      ],
      '#405d53'
    );
    shape(
      c,
      [
        [-23, -115],
        [-23, -122],
        [23, -122],
        [23, -115],
      ],
      '#d1ae68'
    );
    shape(
      c,
      [
        [-15, -123],
        [-15, -145],
        [16, -145],
        [16, -123],
      ],
      '#efbf66',
      '#393f36',
      1.4
    );
    shape(
      c,
      [
        [-21, -146],
        [0, -164],
        [21, -146],
      ],
      '#91b5a1',
      '#293a36',
      2
    );
    for (const xx of [-14, -6, 6, 14])
      shape(
        c,
        [
          [xx, -143],
          [xx, -124],
        ],
        null,
        '#4e594d',
        1.5
      );
    shape(
      c,
      [
        [0, -161],
        [0, -174],
        [9, -170],
        [1, -168],
      ],
      '#e3c884'
    );
    shape(
      c,
      [
        [-3, -93],
        [0, -98],
        [3, -93],
        [3, -86],
        [-3, -86],
      ],
      '#263f3b'
    );
    shape(
      c,
      [
        [-6, -20],
        [-6, -29],
        [0, -34],
        [6, -29],
        [6, -20],
      ],
      '#263f3b'
    );
    for (let i = 0; i < 4; i++)
      shape(
        c,
        [
          [-19 + i * 9, -9],
          [-10 + i * 9, -14],
        ],
        null,
        '#758c74',
        1.4
      );
    c.restore();
  }
  function poster(canvas) {
    const c = canvas.getContext('2d');
    const w = 680,
      h = 560;
    c.clearRect(0, 0, w, h);
    const sky = c.createLinearGradient(0, 34, 0, 531);
    sky.addColorStop(0, '#1e3c3b');
    sky.addColorStop(1, '#15272a');
    c.save();
    c.beginPath();
    c.roundRect(45, 31, 590, 486, 195);
    c.clip();
    c.fillStyle = sky;
    c.fillRect(40, 28, 596, 500);
    for (let i = 0; i < 81; i++) {
      const x = 60 + ((i * 113) % 557),
        y = 54 + ((i * 61) % 280);
      let sz = i % 8 === 0 ? 2.1 : 1;
      c.fillStyle = i % 4 ? '#8cb4a1' : '#d4bb83';
      c.fillRect(x, y, sz, sz);
    }
    c.beginPath();
    c.arc(407, 191, 86, 0, Math.PI * 2);
    c.fillStyle = '#dfc180';
    c.fill();
    c.save();
    c.clip();
    for (let i = 0; i < 54; i++) {
      const yy = 107 + i * 3.3;
      shape(
        c,
        [
          [317, yy],
          [495, yy + 13],
        ],
        null,
        '#c3a96f',
        0.7
      );
    }
    c.restore();
    for (const [x, y, s] of [
      [168, 169, 1],
      [443, 239, 0.7],
      [518, 149, 0.72],
    ]) {
      for (let j = 0; j < 4; j++)
        shape(
          c,
          [
            [x - 43 * s + j * 5, y + j * 4],
            [x - 10 * s, y - 5 * s + j * 4],
            [x + 14 * s, y - 3 * s + j * 4],
            [x + 41 * s - j * 5, y + j * 4],
          ],
          null,
          '#8da791',
          1
        );
    }
    shape(
      c,
      [
        [54, 260],
        [242, 244],
        [367, 237],
        [350, 258],
        [239, 265],
      ],
      'rgba(237,192,106,.17)'
    );
    shape(
      c,
      [
        [357, 237],
        [589, 191],
        [637, 206],
        [363, 247],
      ],
      'rgba(237,192,106,.20)'
    );
    for (let i = 0; i < 14; i++) {
      const y = 335 + i * 12,
        shift = (i % 3) * 7;
      let pts = [];
      for (let x = 36; x < 650; x += 7) {
        pts.push([
          x,
          y +
            Math.sin((x + shift) * 0.033) * 3 +
            Math.sin(x * 0.011 + i * 0.71) * 5,
        ]);
      }
      shape(c, pts, null, i % 3 ? '#395c54' : '#678779', 1.1);
    }
    shape(
      c,
      [
        [131, 402],
        [190, 389],
        [228, 356],
        [270, 347],
        [287, 331],
        [329, 330],
        [353, 318],
        [389, 335],
        [422, 344],
        [442, 366],
        [501, 385],
        [537, 396],
        [493, 409],
        [378, 414],
        [257, 420],
      ],
      '#38584f',
      '#78947c',
      2
    );
    for (let i = 0; i < 28; i++) {
      const x = 219 + ((i * 17) % 246),
        y = 369 + ((i * 13) % 34);
      shape(
        c,
        [
          [x - 9, y + 4],
          [x, y],
          [x + 11, y - 1],
        ],
        null,
        '#7d9680',
        1
      );
    }
    lighthouse(c, 355, 343, 0.78);
    shape(
      c,
      [
        [96, 429],
        [131, 434],
        [160, 426],
        [144, 442],
        [112, 444],
      ],
      '#b9cbb1',
      '#233d3a',
      2
    );
    shape(
      c,
      [
        [130, 431],
        [130, 387],
        [106, 423],
      ],
      '#ccba86',
      '#334942',
      1.5
    );
    for (const [x, y, r] of [
      [185, 112, 5],
      [493, 96, 4],
      [275, 167, 3],
    ]) {
      shape(
        c,
        [
          [x - r, y],
          [x, y - r * 2],
          [x + r, y],
          [x, y + r * 2],
        ],
        gold
      );
    }
    c.restore();
    c.strokeStyle = '#648878';
    c.lineWidth = 1.3;
    c.stroke();
    c.beginPath();
    c.roundRect(51, 37, 578, 474, 187);
    c.strokeStyle = '#435e50';
    c.stroke();
    for (const [x, y] of [
      [72, 75],
      [605, 74],
      [73, 460],
      [604, 460],
    ]) {
      shape(
        c,
        [
          [x - 6, y],
          [x + 6, y],
        ],
        null,
        gold,
        1
      );
      shape(
        c,
        [
          [x, y - 6],
          [x, y + 6],
        ],
        null,
        gold,
        1
      );
    }
  }
  const faces = new WeakMap();
  let towerIcon;
  function dialFace(signal) {
    const surface = document.createElement('canvas');
    surface.width = 480;
    surface.height = 330;
    const c = surface.getContext('2d'),
      x = 240,
      y = 166,
      r = 133;
    const sky = c.createRadialGradient(x, y, 5, x, y, r);
    sky.addColorStop(0, '#27433e');
    sky.addColorStop(1, '#16282b');
    c.fillStyle = sky;
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fill();
    arc(c, x, y, r, 0, Math.PI * 2, '#678475', 1.4);
    arc(c, x, y, r - 11, 0, Math.PI * 2, '#344c44', 1);
    for (let i = 0; i < 48; i++) {
      const a = (i * Math.PI) / 24,
        l = i % 4 === 0 ? 7 : 3;
      shape(
        c,
        [
          [x + Math.cos(a) * (r - l), y + Math.sin(a) * (r - l)],
          [x + Math.cos(a) * r, y + Math.sin(a) * r],
        ],
        null,
        '#90a78e',
        1
      );
    }
    const target = signal.target,
      range = signal.radius;
    arc(c, x, y, r - 2, target - range, target + range, gold, 12);
    for (const sign of [-1, 1]) {
      const a = target + sign * range;
      shape(
        c,
        [
          [x + Math.cos(a) * (r - 17), y + Math.sin(a) * (r - 17)],
          [x + Math.cos(a) * (r + 8), y + Math.sin(a) * (r + 8)],
        ],
        null,
        paper,
        2
      );
    }
    const tx = x + Math.cos(target) * (r + 1),
      ty = y + Math.sin(target) * (r + 1);
    c.save();
    c.translate(tx, ty);
    c.rotate(target);
    shape(
      c,
      [
        [-9, -5],
        [4, -5],
        [9, 0],
        [4, 5],
        [-9, 5],
      ],
      dark
    );
    c.restore();
    return surface;
  }
  function scope(canvas, signal, beam, latched) {
    if (canvas.width !== 480 || canvas.height !== 330) {
      canvas.width = 480;
      canvas.height = 330;
    }
    if (!faces.has(signal)) faces.set(signal, dialFace(signal));
    if (!towerIcon) {
      towerIcon = document.createElement('canvas');
      towerIcon.width = 50;
      towerIcon.height = 72;
      lighthouse(towerIcon.getContext('2d'), 25, 69, 0.37);
    }
    const c = canvas.getContext('2d'),
      x = 240,
      y = 166,
      r = 133;
    c.clearRect(0, 0, 480, 330);
    c.drawImage(faces.get(signal), 0, 0);
    c.fillStyle = latched ? 'rgba(190,199,181,.12)' : 'rgba(133,212,179,.19)';
    c.beginPath();
    c.moveTo(x, y);
    c.arc(x, y, r - 9, beam - 0.115, beam + 0.115);
    c.closePath();
    c.fill();
    shape(
      c,
      [
        [x, y],
        [x + (r - 7) * Math.cos(beam), y + (r - 7) * Math.sin(beam)],
      ],
      null,
      latched ? '#b9cbbd' : teal,
      3.3
    );
    c.drawImage(towerIcon, x - 25, y - 35);
  }
  window.BeaconArt = { poster, scope };
})();
