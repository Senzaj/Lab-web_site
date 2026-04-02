const AppState = {
  likedProfiles: [],
  chats: {}
};

const tabSwipe = document.getElementById('tabSwipe');
const tabChat = document.getElementById('tabChat');
const swipeView = document.getElementById('swipeView');
const chatListView = document.getElementById('chatListView');
const chatPanel = document.getElementById('chatPanel');

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

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
})

function  addLikedProfile(profile) {
  if (AppState.likedProfiles.some(p => p.name === profile.name))
    return;

  AppState.likedProfiles.push(profile);
  AppState.chats[profile.name] = [];

  updateChatListView()

  if (Math.random() < 0.5){
    addIncomingMessage(profile.name, '🤝');
  }
}

