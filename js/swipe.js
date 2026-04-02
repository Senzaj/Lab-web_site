const stack = document.getElementById('stack');
let currentIndex = 0;
let isAnimating = false;

function renderCard() {
  stack.innerHTML = '';

  if (currentIndex >= profiles.length) {
      stack.innerHTML = '<div class="empty-message">✨ Больше нет анкет ✨</div>';
    return;
  }

  const profile = profiles[currentIndex];
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${profile.img}"">
    <h2>${profile.name}, ${profile.age} ${profile.sex}</h2>
    <p>${profile.bio}</p>`;
  stack.appendChild(card);
  moveCard(card)
}

function moveCard(card){
  let startX = 0, currentX = 0, dragging = false;
  card.style.transition = 'none';

  card.onpointerdown = (event) => {
    if (isAnimating)
      return;

    dragging = true;
    startX = event.clientX;
    card.setPointerCapture(event.pointerId);
    card.style.transition = 'none';
    resetColorEffect(card);
  };

  card.onpointermove = (event) => {
    if (!dragging || isAnimating)
      return;

    currentX = event.clientX - startX;
    const rotate = currentX * 0.05;
    const opacity = Math.min(1, Math.abs(currentX) / 600);
    card.style.transform = `translateX(${currentX}px) rotate(${rotate}deg)`;
    card.style.opacity = 1 - opacity * 0.7;

    if (currentX > 0) {
      applyLikeEffect(card, currentX);
    } else if (currentX < 0) {
      applyDislikeEffect(card, currentX);
    } else {
      resetColorEffect(card);
    }
  };

  card.onpointerup = () => {
    if (!dragging || isAnimating) return;
    dragging = false;
    const threshold = 150;

    if (currentX > threshold) {
      exitCard(card, 'right');
    } else if (currentX < -threshold) {
      exitCard(card, 'left');
    } else {
      card.style.transition = 'transform 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease';
      card.style.transform = '';
      card.style.opacity = '';
      resetColorEffect(card);
      setTimeout(() => {
        if (card) card.style.transition = '';
      }, 300);
    }
    currentX = 0;
  };
}

function exitCard(card, direction) {
  if (isAnimating)
    return;

  isAnimating = true;

  const isLike = direction === 'right';
  const translateX = isLike ? 500 : -500;
  const rotate = isLike ? 30 : -30;

  card.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
  card.style.transform = `translateX(${translateX}px) rotate(${rotate}deg)`;
  card.style.opacity = '0';

  setTimeout(() => {
    handleSwipe(isLike);
    isAnimating = false;
  }, 300);
}

function applyLikeEffect(card, offset) {
  const intensity = Math.min(0.8, Math.abs(offset) / 300);
  const green = `rgba(76, 175, 80, ${intensity})`;
  card.style.boxShadow = `0 0 0 4px ${green}, 0 10px 30px rgba(0,0,0,0.1)`;
  card.style.border = `2px solid rgba(76, 175, 80, ${intensity})`;
}

function applyDislikeEffect(card, offset) {
  const intensity = Math.min(0.8, Math.abs(offset) / 300);
  const red = `rgba(244, 67, 54, ${intensity})`;
  card.style.boxShadow = `0 0 0 4px ${red}, 0 10px 30px rgba(0,0,0,0.1)`;
  card.style.border = `2px solid rgba(244, 67, 54, ${intensity})`;
}

function resetColorEffect(card) {
  card.style.boxShadow = '';
  card.style.border = '';
}

function handleSwipe(isLike) {
  if (isLike === true) {
    addLikedProfile(profiles[currentIndex]);
  }

  currentIndex++;
  renderCard();
}

renderCard();