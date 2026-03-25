const card = document.getElementById('card');

let startX = 0;

card.addEventListener('mousedown', (e) => {
  startX = e.clientX;

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
});

function onMove(e) {
  const deltaX = e.clientX - startX;
  card.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.05}deg)`;
}

function onUp(e) {
  const deltaX = e.clientX - startX;

  if (deltaX > 120) {
    swipe('right');
  } else if (deltaX < -120) {
    swipe('left');
  } else {
    card.style.transform = '';
  }

  document.removeEventListener('mousemove', onMove);
  document.removeEventListener('mouseup', onUp);
}

function swipe(direction) {
  const offset = direction === 'right' ? 500 : -500;
  card.style.transform = `translateX(${offset}px) rotate(${offset * 0.05}deg)`;
  card.style.opacity = 0;

  setTimeout(() => {
    resetCard();
  }, 300);
}

function resetCard() {
  card.style.transform = '';
  card.style.opacity = 1;
}