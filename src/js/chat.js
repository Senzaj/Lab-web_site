let currentChat = null;
const chatWindow = document.getElementById('chatWindow');
const chatHeader = document.getElementById('chatHeader');

const names = ['Анатолий','Генадий'];
const chats = [[], []];

function openChat(i) {
  currentChat = i;
  chatPanel.style.display = 'flex';
  chatHeader.innerText = names[i];
  renderChat();
}

function renderChat() {
  chatWindow.innerHTML = '';
  chats[currentChat].forEach(m => {
    const div = document.createElement('div');
    div.className = 'message ' + (m.me ? 'me':'other');
    div.innerText = m.text;
    chatWindow.appendChild(div);
  });
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function sendMessage() {
  const text = messageInput.value;
  if (!text) return;

  chats[currentChat].push({ text, me:true });
  messageInput.value='';
  renderChat();
}
