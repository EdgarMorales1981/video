const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

const peer = new Peer();

peer.on('open', id => {
    console.log(`Tu ID PeerJS es: ${id}`);
    alert(`Tu ID PeerJS es: ${id}`);
});

peer.on('connection', conn => {
    console.log('Conexión recibida');
    handleConnection(conn);
});

function handleConnection(conn) {
    conn.on('data', data => {
        appendMessage(`Amigo: ${data}`);
    });

    sendButton.onclick = () => {
        const msg = messageInput.value;
        conn.send(msg);
        appendMessage(`Yo: ${msg}`);
        messageInput.value = "";
    };
}

sendButton.onclick = () => {
    const friendID = prompt("Introduce el ID de tu amigo:");
    const conn = peer.connect(friendID);
    console.log('Intentando conectar...');
    conn.on('open', () => {
        console.log('Conexión establecida');
        handleConnection(conn);
    });
};

function appendMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.innerText = message;
    messagesDiv.appendChild(messageElement);
}
