let currentChat = null;
const chatWindow = document.getElementById('chatWindow');
const chatHeader = document.getElementById('chatHeader');

const names = ['Анатолий','Генадий'];
const chats = [[], []];

function openChat(index) {
  currentChat = index;
  chatPanel.style.display = 'flex';
  chatHeader.innerText = names[index];
  renderChat();
}

function renderChat() {
  chatWindow.innerHTML = '';
  chats[currentChat].forEach(member => {
    const div = document.createElement('div');
    div.className = 'message ' + (member.me ? 'me':'other');
    div.innerText = member.text;
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
