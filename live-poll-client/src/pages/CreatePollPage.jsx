import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./CreatePollPage.css";

export default function CreatePollPage() {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    const q = question.trim();
    const o1 = option1.trim();
    const o2 = option2.trim();

    if (q && o1 && o2) {
      try {
        const response = await fetch("http://localhost:4000/create-room", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: q, option1: o1, option2: o2 }),
        });

        const data = await response.json();

        if (data.roomId) {
          const roomId = data.roomId;
          navigate(`/vote/${roomId}`, {
            state: { question: q, option1: o1, option2: o2, roomId }
          });
        } else {
          alert("Failed to create room");
        }
      } catch (error) {
        console.error("Error creating room:", error);
        alert("Error connecting to server.");
      }
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <>
      <Header />
      <div className="create-page">
        <h2>Create Poll Room</h2>
        <p>Room ID will be generated</p>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Option 1"
          value={option1}
          onChange={e => setOption1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Option 2"
          value={option2}
          onChange={e => setOption2(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
    </>
  );
}
