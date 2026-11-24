const scene = document.getElementById('scene');
const box = document.getElementById('box');

let rotX = -20;
let rotY = 210;
let lastX = 0;
let lastY = 0;
let dragging = false;
let navigating = false;

const SENSITIVITY = 0.5;

function render() {
  box.style.setProperty('--rx', rotX + 'deg');
  box.style.setProperty('--ry', rotY + 'deg');
}

scene.addEventListener('pointerdown', (e) => {
  if (navigating || e.button !== 0) return;
  dragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
  box.classList.remove('snap');
  scene.setPointerCapture(e.pointerId);
  scene.classList.add('dragging');
});

scene.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  rotY += (e.clientX - lastX) * SENSITIVITY;
  rotX -= (e.clientY - lastY) * SENSITIVITY;
  lastX = e.clientX;
  lastY = e.clientY;
  render();
});

function stopDrag(e) {
  dragging = false;
  scene.classList.remove('dragging');
  if (scene.hasPointerCapture(e.pointerId)) {
    scene.releasePointerCapture(e.pointerId);
  }
}
scene.addEventListener('pointerup', stopDrag);
scene.addEventListener('pointercancel', stopDrag);

const targets = {
  front:  { rx: 0,   ry: 0 },
  back:   { rx: 0,   ry: 180 },
  right:  { rx: 0,   ry: -90 },
  left:   { rx: 0,   ry: 90 },
  top:    { rx: -90, ry: 0 },
  bottom: { rx: 90,  ry: 0 }
};

document.querySelectorAll('.face').forEach((face) => {
  face.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (navigating) return;

    const name = [...face.classList].find((c) => c in targets);
    const href = face.dataset.href;

    box.classList.add('snap');
    rotX = targets[name].rx;
    rotY = targets[name].ry;
    render();

    if (href) {
      navigating = true;
      setTimeout(() => { window.location.href = href; }, 700);
    }
  });
});

render();
