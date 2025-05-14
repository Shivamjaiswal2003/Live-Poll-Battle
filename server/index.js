import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

const PORT = 4000;

// In-memory store for rooms
const rooms = {};

// POST /create-room
app.post('/create-room', (req, res) => {
  const { question, option1, option2 } = req.body;

  if (!question || !option1 || !option2) {
    return res.status(400).json({ error: 'Missing question or options' });
  }

  const roomId = uuidv4().slice(0, 6).toUpperCase();
  rooms[roomId] = {
    question,
    options: { A: 0, B: 0 },
    optionMap: { A: option1, B: option2 },
    users: {},
    timerEnded: false,
    startTime: Date.now()
  };

  res.json({ roomId });
});

// GET /room/:roomId
app.get('/room/:roomId', (req, res) => {
  const room = rooms[req.params.roomId];
  if (!room) return res.status(404).json({ error: 'Room not found' });

  res.json({
    roomId: req.params.roomId,
    question: room.question,
    options: room.options,
    optionMap: room.optionMap,
    timerEnded: room.timerEnded
  });
});

// WebSocket handling
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      const { type, roomId, name = "Anonymous", vote } = data;

      const room = rooms[roomId];
      if (!room) return;

      if (type === 'join') {
        if (!room.users[name]) {
          room.users[name] = { voted: false };
        }

        broadcast(roomId, {
          type: 'vote_update',
          options: room.options
        });

        startCountdown(roomId);
      }

      if (type === 'vote') {
        if (room.timerEnded) return;

        if (!room.users[name]) {
          room.users[name] = { voted: false };
        }

        if (room.users[name].voted) return;

        if (!room.options[vote]) return;

        room.options[vote]++;
        room.users[name].voted = true;

        broadcast(roomId, {
          type: 'vote_update',
          options: room.options
        });
      }
    } catch (err) {
      console.error('Invalid message:', err);
    }
  });
});

// Broadcast helper
function broadcast(roomId, data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(msg);
    }
  });
}

// Timer broadcasting
function startCountdown(roomId) {
  const room = rooms[roomId];
  if (room.countdownStarted) return;

  room.countdownStarted = true;

  const interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - room.startTime) / 1000);
    const secondsLeft = Math.max(0, 60 - elapsed);

    broadcast(roomId, {
      type: 'timer',
      time: secondsLeft
    });

    if (secondsLeft === 0) {
      clearInterval(interval);
      room.timerEnded = true;
      broadcast(roomId, { type: 'timer_end' });
    }
  }, 1000);
}

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
