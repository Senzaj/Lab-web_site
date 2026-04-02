const chatWindow = document.getElementById('chatWindow');
const chatHeader = document.getElementById('chatHeader');
const messageInput = document.getElementById('messageInput');

let currentChatName = null;


function openChat(profile) {
  currentChatName = profile.name;
  chatPanel.style.display = 'flex';
  chatHeader.innerHTML = `
        <span>${profile.name}</span>
        <img src="${profile.img}">`;
  renderChatWindow(profile.name);
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
    chatItem.innerHTML = `
        <head>${profile.name}</head>
        <img src=" ${profile.img}">`;
    chatItem.onclick = () => {openChat(profile);};
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
  if (Math.random() < 0.4 && currentChatName) {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * responseVariants.length);
      const response = responseVariants[randomIndex];
      addIncomingMessage(currentChatName, response);
    }, Math.random() * responseDelay);
  }
}
