const profiles = [
  { name:"Аня", age:23, img:"assets/images/profiles/anna.png", bio:"Люблю кофе ?" },
  { name:"Катя", age:25, img:"assets/images/profiles/kate.png", bio:"Спорт и путешествия" }
];

let index = 0;
const stack = document.getElementById('stack');

function renderCards() {
  stack.innerHTML = '';
  for (let i=index;i<index+2;i++) {
    if(!profiles[i]) continue;
    const p = profiles[i];

    const c = document.createElement('div');
    c.className='card';

    c.innerHTML=`
      <div class="card-actions">
        <button onclick="handleAction(-1)">?</button>
        <button onclick="handleAction(1)">??</button>
      </div>
      <img src="${p.img}">
      <h2>${p.name}, ${p.age}</h2>
      <p>${p.bio}</p>
    `;

    stack.appendChild(c);
  }

  initDrag();
}

function handleAction(dir){
  index++;
  renderCards();
}

let startX=0, currentX=0, dragging=false;

function initDrag(){
  const card=document.querySelector('.card');
  if(!card) return;

  card.onpointerdown=e=>{
    dragging=true;
    startX=e.clientX;
    card.setPointerCapture(e.pointerId);
  };

  card.onpointermove=e=>{
    if(!dragging) return;
    currentX=e.clientX-startX;
    card.style.transform=`translateX(${currentX}px) rotate(${currentX*0.05}deg)`;
  };

  card.onpointerup=()=>{
    dragging=false;

    if(currentX>120) handleAction(1);
    else if(currentX<-120) handleAction(-1);
    else card.style.transform='';

    currentX=0;
  };
}

renderCards();