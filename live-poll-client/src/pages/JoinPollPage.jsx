import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./JoinPollPage.css";

export default function JoinPollPage() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    const code = roomId.trim().toUpperCase();
    if (!code) {
      alert("Please enter a Poll ID");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/room/${code}`);
      if (response.ok) {
        const room = await response.json();
        navigate(`/vote/${code}`, {
          state: {
            question: room.question,
            option1: room.optionMap?.A || "Option A",
            option2: room.optionMap?.B || "Option B",
            roomId: code,
          },
        });
      } else {
        alert("Room not found");
      }
    } catch (error) {
      console.error("Error joining room:", error);
      alert("Failed to connect to server");
    }
  };

  return (
    <>
      <Header />
      <div className="join-page">
        <h2>Join Poll Room</h2>
        <input
          type="text"
          placeholder="Enter Poll ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={handleJoin}>Find a Poll</button>
      </div>
    </>
  );
}
