🗳️ Live Poll Battle
A real-time voting web application built with React, Node.js, and WebSockets that allows users to join poll rooms, cast votes, and view live results in a dynamic pie chart.

🚀 Demo
Coming Soon – Live URL / Demo Video

📸 Screenshots

Join Poll Room:

Voting Interface:

Live Results:

🎯 Features

Real-time voting updates using WebSockets

Timer-based polls (60 seconds countdown)

One vote per user per poll (tracked via localStorage)

Dynamic pie chart visualization with Recharts

Responsive and interactive UI

🛠 Tech Stack

Frontend:

React.js

React Router DOM

Recharts

CSS

Backend:

Node.js

Express.js

WebSocket (ws)

📁 Project Structure

root
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ │ └── Header.js
│ │ ├── pages/
│ │ │ ├── JoinPollPage.jsx
│ │ │ └── VotingPage.jsx
│ │ ├── socket.js
│ │ └── App.js
├── server/ # Node.js backend
│ └── index.js
├── README.md
└── package.json

⚙️ Getting Started

Step 1: Clone the Repository

git clone https://github.com/yourusername/live-poll-battle.git
cd live-poll-battle

Step 2: Install Dependencies

Backend:

cd server
npm install
npm install nodemon --save-dev

Frontend:

cd ../client
npm install

Step 3: Run the App

Start Backend Server:

cd server
npm run dev

Start Frontend:

cd ../client
npm start

Now visit http://localhost:3000 to access the app.

🧠 How It Works

JoinPollPage.jsx:

User enters a Poll ID

Fetches poll question & options from backend

Navigates to VotingPage with data

VotingPage.jsx:

Connects to WebSocket server

Sends join event

Listens for vote updates and timer

Renders pie chart and vote counts

Restricts voting to one per user (via localStorage)

Backend (server/index.js):

Manages rooms, votes, and timers

Broadcasts vote updates and timer ticks

Handles WebSocket connections and messages

🪄 Sample WebSocket Message Formats

Client → Server:

{
type: "join",
roomId: "abc123",
name: "User_1001"
}

{
type: "vote",
roomId: "abc123",
name: "User_1001",
vote: "A"
}

Server → Client:

{
type: "vote_update",
options: { A: 3, B: 5 }
}

{
type: "timer",
time: 42
}

{
type: "timer_end"
}

🔐 LocalStorage Keys

Used to prevent duplicate voting per room.

localStorage.setItem("voted_abc123", "true")
localStorage.setItem("user_abc123", "User_1001")

📦 Scripts

Frontend (client):

npm start # start React app
npm run build # build for production

Backend (server):

npm run dev # start with nodemon
npm start # start with node