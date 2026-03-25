const tabSwipe = document.getElementById('tabSwipe');
const tabChat = document.getElementById('tabChat');
const swipeView = document.getElementById('swipeView');
const chatListView = document.getElementById('chatListView');
const chatPanel = document.getElementById('chatPanel');

// tabs
tabSwipe.onclick = () => {
  tabSwipe.classList.add('active');
  tabChat.classList.remove('active');
  swipeView.classList.add('active');
  chatListView.classList.remove('active');
  chatPanel.style.display = 'none';
};

tabChat.onclick = () => {
  tabChat.classList.add('active');
  tabSwipe.classList.remove('active');
  swipeView.classList.remove('active');
  chatListView.classList.add('active');
};

// profile edit
const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const inputs = [userName, birth, bio];
let editing = false;

editBtn.onclick = () => {
  editing = true;
  inputs.forEach(i => i.disabled = false);
  saveBtn.style.display = 'block';
  editBtn.style.display = 'none';
};

saveBtn.onclick = () => {
  editing = false;
  inputs.forEach(i => i.disabled = true);
  saveBtn.style.display = 'none';
  editBtn.style.display = 'block';
};

// gender toggle
const toggleOptions = document.querySelectorAll('.toggle-option');
toggleOptions.forEach(opt => {
  opt.onclick = () => {
    if (!editing) return;
    toggleOptions.forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
  };
});
