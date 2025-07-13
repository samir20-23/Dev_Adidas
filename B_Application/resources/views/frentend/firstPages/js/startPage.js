
const boxCenter  = document.querySelector('.boxCenter');
const forwardBtn = document.querySelector('.forwardBtn');
const content    = document.querySelector('.content');

let move   = false;
let startX = 0;
let lastMoveX = 0;

forwardBtn.addEventListener('mousedown', e => {
  e.preventDefault();
  move   = true;
  startX = e.clientX;
  document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', e => {
  if (!move) return;

  const dx = e.clientX - startX;
  const maxMove = boxCenter.clientWidth - forwardBtn.clientWidth - 6;
  const moveX   = Math.min(Math.max(0, dx), maxMove);
  lastMoveX     = moveX;

  forwardBtn.style.left     = `${moveX + 3}px`;
  forwardBtn.style.minWidth = `${Math.max(20, (moveX / maxMove) * 100)}%`;

  const opacity = 1 - (moveX / maxMove);
  content.style.opacity = opacity;

  if (opacity <= 0.5) {
    content.style.display = 'none';
  } else {
    content.style.display = 'flex';
  }

  boxCenter.style.padding = '3px';

});

document.addEventListener('mouseup', () => {
  if (!move) return;
  move = false;
  document.body.style.userSelect = ''; 
  setTimeout(() => { 
    forwardBtn.style.transition = 'left 0.3s ease, min-width 0.3s ease';
    forwardBtn.style.left      = '3px';
    forwardBtn.style.minWidth  = '48px'; 
    content.style.display = 'flex';
    boxCenter.style.paddingRight='30px';
    content.style.opacity = '1'; 
    setTimeout(() => {
      forwardBtn.style.transition = '';
    }, 300);
  }, 1000);  
});
// 3d
document.addEventListener('mousemove', e => {
  // 3d
    const xRatio = (e.clientX / window.innerWidth) * 2 - 1;
    const yRatio = (e.clientY / window.innerHeight) * 2 - 1;
    const rotateY = xRatio * 20;    
    const rotateX = -yRatio * 20;    

    boxCenter.style.transform = 
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    content.style.transform = `translateZ(20px)`; 
})
  document.addEventListener('mouseleave', () => {
    boxCenter.style.transform = '';
    content.style.transform   = '';
  });