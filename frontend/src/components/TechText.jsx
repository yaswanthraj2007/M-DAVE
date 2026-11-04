import { useEffect, useRef, useCallback } from 'react';
import './TechText.css';

/* ─────────────────────────────────────────────────────────────
   TechText – React Bits-inspired interactive wordmark component
   ───────────────────────────────────────────────────────────── */

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function TechText({
  text = 'TEXT',
  fontSize = 120,
  fontWeight = 700,
  color = '#e4e4e7',
  accentColor = '#ef4444',
  dashLength = 4,
  dashGap = 2,
  guides = false,
  specks = 15,
  intro = 'assemble',
  introDuration = 2,
  reveal = 'letter',
  clickKick = true,
  className = '',
}) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    mouse: { x: -9999, y: -9999 },
    letters: [],
    specks: [],
    kickTime: 0,
    kickOrigin: { x: 0, y: 0 },
    introStart: null,
    animFrame: null,
    dpr: 1,
  });

  const buildScene = useCallback((canvas) => {
    const state = stateRef.current;
    const dpr = window.devicePixelRatio || 1;
    state.dpr = dpr;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Measure letters
    ctx.font = `${fontWeight} ${fontSize}px system-ui, sans-serif`;
    const chars = text.split('');
    const metrics = chars.map((c) => ctx.measureText(c));
    const totalWidth = metrics.reduce((s, m) => s + m.width, 0);
    const spacing = totalWidth < w ? (w - totalWidth) / (chars.length + 1) : 8;
    let x = (w - totalWidth - spacing * (chars.length - 1)) / 2;
    const baseline = h / 2 + fontSize * 0.35;

    state.letters = chars.map((char, i) => {
      const lw = metrics[i].width;
      const delay = reveal === 'letter' ? (i / chars.length) * introDuration * 0.6 : 0;
      const obj = {
        char,
        x,
        y: baseline,
        targetX: x,
        targetY: baseline,
        startX: x + (Math.random() - 0.5) * w * 0.4,
        startY: baseline + (Math.random() - 0.5) * h,
        alpha: 0,
        delay,
        width: lw,
      };
      x += lw + spacing;
      return obj;
    });

    // Specks
    state.specks = Array.from({ length: specks }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    state.introStart = performance.now();
  }, [text, fontSize, fontWeight, specks, reveal, introDuration]);

  const draw = useCallback((canvas) => {
    const state = stateRef.current;
    const ctx = canvas.getContext('2d');
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);

    const now = performance.now();
    const elapsed = (now - (state.introStart ?? now)) / 1000;
    const kickElapsed = (now - state.kickTime) / 1000;
    const kickStrength = Math.max(0, 1 - kickElapsed / 0.6);

    // Guide lines
    if (guides) {
      ctx.save();
      ctx.setLineDash([dashLength, dashGap]);
      ctx.strokeStyle = accentColor + '44';
      ctx.lineWidth = 0.5;
      // horizontal center
      ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
      // vertical center
      ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.stroke();
      ctx.restore();
    }

    // Letters
    ctx.font = `${fontWeight} ${fontSize}px system-ui, sans-serif`;
    ctx.textBaseline = 'alphabetic';

    state.letters.forEach((l) => {
      const t = Math.min(1, Math.max(0, (elapsed - l.delay) / (introDuration * 0.4)));
      const ease = easeOutExpo(t);
      l.alpha = ease;

      // Mouse proximity glow
      const cx = l.x + l.width / 2;
      const dist = Math.hypot(state.mouse.x - cx, state.mouse.y - l.y - fontSize * 0.1);
      const glowFactor = Math.max(0, 1 - dist / (fontSize * 1.8));

      // Kick displacement
      let kx = 0, ky = 0;
      if (kickStrength > 0) {
        const dx = cx - state.kickOrigin.x;
        const dy = l.y - state.kickOrigin.y;
        const kDist = Math.hypot(dx, dy) || 1;
        kx = (dx / kDist) * kickStrength * 12;
        ky = (dy / kDist) * kickStrength * 12;
      }

      if (intro === 'assemble') {
        const drawX = lerp(l.startX, l.targetX, ease) + kx;
        const drawY = lerp(l.startY, l.targetY, ease) + ky;
        ctx.save();
        ctx.globalAlpha = l.alpha;
        if (glowFactor > 0) {
          ctx.shadowColor = accentColor;
          ctx.shadowBlur = 18 * glowFactor;
          ctx.fillStyle = lerp2color(color, accentColor, glowFactor * 0.55);
        } else {
          ctx.fillStyle = color;
        }
        ctx.fillText(l.char, drawX, drawY);
        ctx.restore();
      } else {
        ctx.save();
        ctx.globalAlpha = l.alpha;
        ctx.fillStyle = glowFactor > 0
          ? lerp2color(color, accentColor, glowFactor * 0.55)
          : color;
        if (glowFactor > 0) {
          ctx.shadowColor = accentColor;
          ctx.shadowBlur = 18 * glowFactor;
        }
        ctx.fillText(l.char, l.targetX + kx, l.targetY + ky);
        ctx.restore();
      }
    });

    // Specks
    state.specks.forEach((s) => {
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h;
      if (s.y > h) s.y = 0;

      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    state.animFrame = requestAnimationFrame(() => draw(canvas));
  }, [color, accentColor, dashLength, dashGap, guides, fontSize, fontWeight, intro, introDuration]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    buildScene(canvas);
    stateRef.current.animFrame = requestAnimationFrame(() => draw(canvas));

    const onResize = () => { buildScene(canvas); };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (stateRef.current.animFrame) cancelAnimationFrame(stateRef.current.animFrame);
    };
  }, [buildScene, draw]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    stateRef.current.mouse = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };
  const handleMouseLeave = () => {
    stateRef.current.mouse = { x: -9999, y: -9999 };
  };
  const handleClick = (e) => {
    if (!clickKick) return;
    const rect = canvasRef.current.getBoundingClientRect();
    stateRef.current.kickOrigin = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    stateRef.current.kickTime = performance.now();
  };

  return (
    <canvas
      ref={canvasRef}
      className={`techtext-canvas ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    />
  );
}

// Interpolate between two hex colors
function lerp2color(hex1, hex2, t) {
  const p = (h) => parseInt(h.slice(1), 16);
  const r1 = (p(hex1) >> 16) & 0xff, g1 = (p(hex1) >> 8) & 0xff, b1 = p(hex1) & 0xff;
  const r2 = (p(hex2) >> 16) & 0xff, g2 = (p(hex2) >> 8) & 0xff, b2 = p(hex2) & 0xff;
  const r = Math.round(lerp(r1, r2, t));
  const g = Math.round(lerp(g1, g2, t));
  const b = Math.round(lerp(b1, b2, t));
  return `rgb(${r},${g},${b})`;
}

