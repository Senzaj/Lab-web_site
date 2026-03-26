const chatWindow = document.getElementById('chatWindow');
const chatHeader = document.getElementById('chatHeader');
const messageInput = document.getElementById('messageInput');

let currentChatName = null;

function openChat(profileName) {
  currentChatName = profileName;
  chatPanel.style.display = 'flex';
  chatHeader.innerText = profileName;
  renderChatWindow(profileName);
}

function renderChatWindow(profileName) {
  if (!chatWindow)
    return;

  const messages = AppState.chats[profileName] || [];

  chatWindow.innerHTML = '';

  messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = 'message ' + (msg.me ? 'me' : 'other')
    div.innerText = msg.text;
    chatWindow.appendChild(div);
  });

  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function updateChatListView() {
  const chatListView = document.getElementById('chatListView');
  const chatListDiv = document.querySelector('.chat-list');

  if (!chatListView || !chatListDiv)
    return;

  chatListDiv.innerHTML = '';

  if (AppState.likedProfiles.length === 0) {
    chatListDiv.innerHTML = '' +
        '<div class="chat-empty">Диалогов нет</div>';
    return;
  }

  AppState.likedProfiles.forEach(profile => {
    const chatItem = document.createElement('div');
    chatItem.className = 'chat-item';
    chatItem.innerText = profile.name;
    chatItem.onclick = () => {openChat(profile.name);};
    chatListDiv.appendChild(chatItem);
  });
}

function sendMessage() {
  const text = messageInput.value.trim();

  if (!text)
    return;

  if (!AppState.chats[currentChatName]){
    AppState.chats[currentChatName] = [];
  }
  AppState.chats[currentChatName].push({text, me: true});
  messageInput.value = '';
  renderChatWindow(currentChatName);

  tryGetResponse()
}


function addIncomingMessage(profileName, messageText) {
  if (!AppState.chats[profileName])
    return;

  AppState.chats[profileName].push({text: messageText, me: false});

  if (currentChatName === profileName){
    renderChatWindow(profileName);
  }

  updateChatListView()
}

function tryGetResponse() {
  if (Math.random() < 0.3 && currentChatName) {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * responseVariants.length);
      const response = responseVariants[randomIndex];
      addIncomingMessage(currentChatName, response);
    }, Math.random() * 1000);
  }
}
