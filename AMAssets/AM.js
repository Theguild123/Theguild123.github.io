const item = document.getElementById('boothItem');
const me = document.getElementById('me');
const passport = document.getElementById('passport');

// Terminal button: turns the highlight off, brings in Me and the passport
item.addEventListener('click', () => {
  item.setAttribute('aria-pressed', 'false');
  item.disabled = true;
  me.hidden = false;
  passport.hidden = false;
}, { once: true });


// Stamp carriage
const carriage = document.getElementById('carriage');
const edge = document.getElementById('carriageEdge');

edge.addEventListener('click', () => {
  const open = carriage.classList.toggle('open');
  edge.setAttribute('aria-expanded', String(open));
});


// ---------- Passport drag ----------
// Every number below is in pixels of the original 570 x 217 desk art.
// The CSS scales them to the real screen size.
const DESK    = { w: 570, h: 217 };   // FrontDesk.png
const TABLE_X = 178;                  // the big table starts where the booth window ends
const SIZE    = {
  small: { w: 30,  h: 40  },          // Passportsmall.png, on the counter
  large: { w: 130, h: 162 }           // Passport.png, on the big table
};
const REST = { x: 59, y: 93 };        // where the small passport sits on the counter

const front = document.querySelector('.front');

let mode = 'small';
let x = REST.x;
let y = REST.y;
let grab = { fx: 0, fy: 0 };          // where you grabbed it, as a fraction of its size
let dragging = false;

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

function render() {
  passport.dataset.mode = mode;
  passport.style.setProperty('--w', SIZE[mode].w);
  passport.style.setProperty('--h', SIZE[mode].h);
  passport.style.setProperty('--x', x);
  passport.style.setProperty('--y', y);
}

// Pointer position in art pixels, measured from the top-left of the desk section
function pointerInDesk(e) {
  const r = front.getBoundingClientRect();
  const scale = r.width / DESK.w;
  return {
    x: clamp((e.clientX - r.left) / scale, 0, DESK.w),
    y: clamp((e.clientY - r.top) / scale, 0, DESK.h)
  };
}

passport.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse' && e.button !== 0) return;   // left button only
  const p = pointerInDesk(e);
  grab.fx = (p.x - x) / SIZE[mode].w;
  grab.fy = (p.y - y) / SIZE[mode].h;
  dragging = true;
  passport.setPointerCapture(e.pointerId);
  passport.classList.add('dragging');
  e.preventDefault();
});

passport.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  const p = pointerInDesk(e);

  // Whichever side of the line the pointer is on decides which passport you see
  mode = p.x >= TABLE_X ? 'large' : 'small';
  const { w, h } = SIZE[mode];

  // Keep the grab point under the pointer, even when the size changes
  x = p.x - grab.fx * w;
  y = p.y - grab.fy * h;

  // On the big table the passport stays fully on the table
  x = clamp(x, mode === 'large' ? TABLE_X : 0, DESK.w - w);
  y = clamp(y, 0, DESK.h - h);

  // Whole art pixels keep the passport lined up with the pixel art behind it
  x = Math.round(x);
  y = Math.round(y);
  render();
});

function drop() {
  if (!dragging) return;
  dragging = false;
  passport.classList.remove('dragging');

  // Let go over the counter side: it goes back to its spot on the counter
  if (mode === 'small') {
    x = REST.x;
    y = REST.y;
  }
  render();
}

passport.addEventListener('pointerup', drop);
passport.addEventListener('pointercancel', drop);

render();
