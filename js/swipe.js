const profiles = [
  { name:"Олег", age:23, img:"assets/images/profiles/oleg.png", bio:"Люблю кофе :3" },
  { name:"Евпатий", age:25, img:"assets/images/profiles/evpatij.png", bio:"Ненавижу грязный спорт" }
];

let index = 0;
const stack = document.getElementById('stack');

function renderCards() {
  stack.innerHTML = '';

  for (let i = index; i < index + 2; i++) {
    if (!profiles[i])
      continue;

    const profile = profiles[i];
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-actions">
        <button onclick="handleAction(-1)">❌</button>
        <button onclick="handleAction(1)">❤️</button>
      </div>
      <img src="${profile.img}">
      <h2>${profile.name}, ${profile.age}</h2>
      <p>${profile.bio}</p>
`;

    stack.appendChild(card);
  }

  initDrag();
}

function handleAction(dir) {
  index++;
  renderCards();
}

let startX=0, currentX=0, dragging=false;

function initDrag() {
  const card = document.querySelector('.card');
  if (!card)
    return;

  card.onpointerdown = event => {
    dragging = true;
    startX = event.clientX;
    card.setPointerCapture(event.pointerId);
  };

  card.onpointermove = event => {
    if (!dragging)
      return;
    currentX = event.clientX - startX;
    card.style.transform = `translateX(${currentX}px) rotate(${currentX * 0.05}deg)`;
  };

  card.onpointerup = () => {
    dragging = false;

    if (currentX > 120)
      handleAction(1);
    else if (currentX < -120)
      handleAction(-1);
    else
      card.style.transform = '';

    currentX = 0;
  };
}

renderCards();