const scene = document.querySelector('.scene');
const box = document.querySelector('.box');

let rotX = -20;   
let rotY = 30;
let lastX = 0;
let lastY = 0;
let dragging = false;
let dragable = true;

const SENSITIVITY = .5; 

function render() {
  box.style.setProperty('--rx', rotX + 'deg');
  box.style.setProperty('--ry', rotY + 'deg');
}

scene.addEventListener('mousedown', (e) => {
  if (!dragable) return;
  if (e.button === 0) {
  dragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
  scene.setPointerCapture(e.pointerId);
  scene.classList.add('dragging');
  }
});

scene.addEventListener('mousemove', (e) => {
  if (!dragable) return;
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
document.addEventListener('keydown', (event) => { 
  if (event.key === 'Escape') {
    document.querySelector('.paperspleaselink').style.display = 'block';
  }
});
scene.addEventListener('mouseup', stopDrag);
scene.addEventListener('mouseleave', stopDrag);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    document.querySelector('.popup').style.display = 'none';
  }
});

document.querySelector('.face.front').addEventListener('contextmenu', (e) => {
  e.preventDefault();
  box.style.setProperty('--rx', '0deg');
  box.style.setProperty('--ry', '0deg');
  rotY  = 0;
  rotX = 0;
  document.querySelector('.left').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.left').style.transform = 'translate3d(-2080px,0,0)   rotateY(-90deg) ';
  document.querySelector('.right').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.right').style.transform = 'translate3d(2080px,0,0)   rotateY(90deg) ';
  document.querySelector('.top').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.top').style.transform = 'translate3d(0,-2080px,0)   rotateX(90deg) ';
  document.querySelector('.bottom').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.bottom').style.transform = 'translate3d(0,2080px,0)   rotateX(-90deg)';
  setTimeout(() => {
  window.location.href = "aboutme/aboutme.html";
  }, 1000);


});
document.querySelector('.face.back').addEventListener('contextmenu', (e) => {
  e.preventDefault();
  box.style.setProperty('--rx', '0deg');
  box.style.setProperty('--ry', '180deg');
  rotY  = 180;
  rotX = 0;
   document.querySelector('.left').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.left').style.transform = 'translate3d(-2080px,0,0)   rotateY(-90deg) ';
  document.querySelector('.right').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.right').style.transform = 'translate3d(2080px,0,0)   rotateY(90deg) ';
  document.querySelector('.top').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.top').style.transform = 'translate3d(0,-2080px,0)   rotateX(90deg) ';
  document.querySelector('.bottom').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.bottom').style.transform = 'translate3d(0,2080px,0)   rotateX(-90deg)';
  setTimeout(() => {
  window.location.href = "resume/resume.html";
  }, 1000);
  
});
document.querySelector('.face.right').addEventListener('contextmenu', (e) => {
  e.preventDefault();
  box.style.setProperty('--rx', '0deg');
  box.style.setProperty('--ry', '-90deg');
  rotY  = -90;
  rotX = 0;
  document.querySelector('.top').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.top').style.transform = 'translate3d(0,-2080px,0)   rotateX(90deg) ';
  document.querySelector('.bottom').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.bottom').style.transform = 'translate3d(0,2080px,0)   rotateX(-90deg)';
  document.querySelector('.front').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.front').style.transform = 'translate3d(0,0,2080px)';
  document.querySelector('.back').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.back').style.transform = 'translate3d(0,0,-2080px)';
  setTimeout(() => {
  window.location.href = "pastprojects/pastprojects.html";
  }, 1000);
});
document.querySelector('.face.left').addEventListener('contextmenu', (e) => {
  e.preventDefault();
  box.style.setProperty('--rx', '0deg');
  box.style.setProperty('--ry', '90deg');
  rotY  = 90;
  rotX = 0;
  document.querySelector('.top').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.top').style.transform = 'translate3d(0,-2080px,0)   rotateX(90deg) ';
  document.querySelector('.bottom').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.bottom').style.transform = 'translate3d(0,2080px,0)   rotateX(-90deg)';
  document.querySelector('.front').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.front').style.transform = 'translate3d(0,0,2080px)';
  document.querySelector('.back').style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
  document.querySelector('.back').style.transform = 'translate3d(0,0,-2080px)';
  setTimeout(() => {
  window.location.href = "skills/skills.html";
  }, 1000);
});
document.querySelector('.face.top').addEventListener('contextmenu', (e) => {
  e.preventDefault();
  box.style.setProperty('--rx', '-90deg');
  box.style.setProperty('--ry', '0deg');
  rotY  = 0;
  rotX = -90;

}
);
document.querySelector('.face.bottom').addEventListener('contextmenu', (e) => {
  e.preventDefault();
  box.style.setProperty('--rx', '90deg');
  box.style.setProperty('--ry', '0deg');
  rotY  = 0;
  rotX = 90;


});



render();
