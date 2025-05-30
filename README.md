# 🗳️ Live Poll Battle

A **real-time voting web application** built with React, Node.js, and WebSockets that allows users to join poll rooms, cast votes, and view live results in a dynamic pie chart.

---



## 🎯 Features

- 🔄 Real-time voting updates using **WebSockets**
- ⏱️ Timer-based polls (e.g., **60-second countdown**)
- 🔐 One vote per user per poll (tracked via `localStorage`)
- 📊 Dynamic pie chart visualization with **Recharts**
- 📱 Responsive and interactive **UI**

---

## 🛠️ Tech Stack

### Frontend
- [React.js](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [Recharts](https://recharts.org/)
- CSS

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [ws (WebSocket)](https://github.com/websockets/ws)

---

## 📁 Project Structure

```
live-poll-battle/
├── client/              # React frontend
│   └── src/
│       ├── components/
│       │   └── Header.js
│       ├── pages/
│       │   ├── JoinPollPage.jsx
│       │   └── VotingPage.jsx
│       ├── socket.js
│       └── App.js
├── server/              # Node.js backend
│   └── index.js
├── README.md
└── package.json
```

---

## ⚙️ Getting Started

### Step 1: Clone the Repository
```bash
git clone https://github.com/Shivamjaiswal2003/Live-Poll-Battle.git
cd Live-Poll-Battle
```

### Step 2: Install Dependencies

**Backend**
```bash
cd server
npm install
npm install nodemon --save-dev
```

**Frontend**
```bash
cd ../client
npm install
```

### Step 3: Run the App

**Start Backend Server**
```bash
cd server
npm run dev
```

**Start Frontend**
```bash
cd ../client
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the app.

---

## 🧠 How It Works

### `JoinPollPage.jsx`
- User enters a Poll ID
- Fetches poll question and options from the backend
- Navigates to the voting page

### `VotingPage.jsx`
- Connects to WebSocket server
- Sends a `join` event
- Listens for vote updates and timer
- Renders pie chart and vote count
- Restricts voting (one vote per user using `localStorage`)

### `server/index.js`
- Manages rooms, votes, and countdown timers
- Handles WebSocket events
- Broadcasts vote updates and remaining time to clients

---

## 🔌 WebSocket Message Formats

### Client → Server
```json
{
  "type": "join",
  "roomId": "abc123",
  "name": "User_1001"
}
```

```json
{
  "type": "vote",
  "roomId": "abc123",
  "name": "User_1001",
  "vote": "A"
}
```

### Server → Client
```json
{
  "type": "vote_update",
  "options": {
    "A": 3,
    "B": 5
  }
}
```

```json
{
  "type": "timer",
  "time": 42
}
```

```json
{
  "type": "timer_end"
}
```

---

## 📦 NPM Scripts

### Frontend (`client`)
```bash
npm start       # Start development server
npm run build   # Build for production
```

### Backend (`server`)
```bash
npm run dev     # Start with nodemon (development)
npm start       # Start with node (production)
```

---
