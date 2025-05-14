let socket;

export const connectSocket = (onMessage) => {
  socket = new WebSocket("ws://localhost:4000");

  socket.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (onMessage) onMessage(data);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};

export const sendMessage = (data) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  }
};
