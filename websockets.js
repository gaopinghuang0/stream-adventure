const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8099');
const stream = WebSocket.createWebSocketStream(ws);

const data = 'hello\n';
stream.write(data);
stream.pipe(process.stdout);