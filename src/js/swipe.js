const profiles = [
  { name: "Олег", sex: "♂️", age: "23 года", img: "assets/images/profiles/oleg.png", bio: "Люблю кофе :3" },
  { name: "Евпатий", sex: "♂️", age: "25 лет", img: "assets/images/profiles/evpatij.png", bio: "Ненавижу грязный спорт" }
];

let currentIndex = 0;
const stack = document.getElementById('stack');

function renderCard() {
  stack.innerHTML = '';

  if (currentIndex >= profiles.length) {
    stack.innerHTML = '<div class="card">✨ Больше нет анкет ✨</div>';
    return;
  }

  const profile = profiles[currentIndex];
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${profile.img}" alt="${profile.name}">
    <h2>${profile.name}, ${profile.age} ${profile.sex}</h2>
    <p>${profile.bio}</p>
  `;
  stack.appendChild(card);

  let startX = 0, currentX = 0, dragging = false;

  card.style.transition = 'none';

  card.onpointerdown = (event) => {
    dragging = true;
    startX = event.clientX;
    card.setPointerCapture(event.pointerId);
    card.style.transition = 'none';
    resetColorEffect(card);
  };

  card.onpointermove = (event) => {
    if (!dragging) return;
    currentX = event.clientX - startX;
    const rotate = currentX * 0.1;
    const opacity = Math.min(1, Math.abs(currentX) / 200);
    card.style.transform = `translateX(${currentX}px) rotate(${rotate}deg)`;
    card.style.opacity = 1 - opacity * 0.5;

    if (currentX > 0) {
      applyLikeEffect(card, currentX);
    } else if (currentX < 0) {
      applyDislikeEffect(card, currentX);
    } else {
      resetColorEffect(card);
    }
  };

  card.onpointerup = () => {
    dragging = false;
    const threshold = 120;

    if (currentX > threshold) {
      handleAction(1);
    } else if (currentX < -threshold) {
      handleAction(-1);
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

function applyLikeEffect(card, offset) {
  const intensity = Math.min(0.6, Math.abs(offset) / 200);
  const green = `rgba(76, 175, 80, ${intensity})`;
  card.style.boxShadow = `0 0 0 4px ${green}, 0 10px 30px rgba(0,0,0,0.1)`;
  card.style.border = `2px solid rgba(76, 175, 80, ${intensity})`;
}

function applyDislikeEffect(card, offset) {
  const intensity = Math.min(0.6, Math.abs(offset) / 200);
  const red = `rgba(244, 67, 54, ${intensity})`;
  card.style.boxShadow = `0 0 0 4px ${red}, 0 10px 30px rgba(0,0,0,0.1)`;
  card.style.border = `2px solid rgba(244, 67, 54, ${intensity})`;
}

function resetColorEffect(card) {
  card.style.boxShadow = '';
  card.style.border = '';
}

function handleAction(direction) {
  console.log(direction === 1 ? '❤️ Лайк' : '❌ Дизлайк', profiles[currentIndex].name);
  currentIndex++;
  renderCard();
}

renderCard();