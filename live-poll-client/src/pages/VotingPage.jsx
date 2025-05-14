import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { connectSocket, sendMessage } from "../socket";
import Header from "../components/Header";
import "./VotingPage.css";

export default function VotingPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const initialData = location.state || {
    question: "Loading...",
    option1: "Option A",
    option2: "Option B",
    roomId,
  };

  const [votes, setVotes] = useState({ option1: 0, option2: 0 });
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [hasVoted, setHasVoted] = useState(
    localStorage.getItem(`voted_${roomId}`) === "true"
  );
  const [isVotingEnded, setIsVotingEnded] = useState(false);

  const COLORS = ["#FF8042", "#0088FE"];
  const data = [
    { name: initialData.option1, value: votes.option1 },
    { name: initialData.option2, value: votes.option2 },
  ];

  const handleVote = (option) => {
    if (hasVoted || isVotingEnded) return;

    const voteCode = option === "option1" ? "A" : "B";

    sendMessage({
      type: "vote",
      roomId,
      name: "User", // placeholder user name
      vote: voteCode
    });

    localStorage.setItem(`voted_${roomId}`, "true");
    setHasVoted(true);
  };

  useEffect(() => {
    connectSocket((data) => {
      if (data.type === "vote_update") {
        setVotes({
          option1: data.options["A"] || 0,
          option2: data.options["B"] || 0,
        });
      } else if (data.type === "timer") {
        setSecondsLeft(data.time);
      } else if (data.type === "timer_end") {
        setIsVotingEnded(true);
      }
    });

    sendMessage({
      type: "join",
      roomId,
      name: "User"
    });
  }, [roomId]);

  return (
    <>
      <Header />
      <div className="voting-container">
        <div className="voting-left">
          <div className="question-label">Question:</div>
          <div className="question-text">{initialData.question}</div>
          <div className="timer-box">Timer: {secondsLeft}s</div>
          <button onClick={() => handleVote("option1")} disabled={hasVoted || isVotingEnded}>
            {initialData.option1}
          </button>
          <button onClick={() => handleVote("option2")} disabled={hasVoted || isVotingEnded}>
            {initialData.option2}
          </button>
          <p>{votes.option1} votes for {initialData.option1}</p>
          <p>{votes.option2} votes for {initialData.option2}</p>
          {hasVoted && <p>You have already voted!</p>}
          {isVotingEnded && <p>Voting has ended.</p>}
          <p className="poll-id">Poll ID: {roomId}</p>
        </div>
        <div className="voting-right">
          <div className="color-inputs">
            <input style={{ backgroundColor: COLORS[0] }} placeholder={initialData.option1} readOnly />
            <input style={{ backgroundColor: COLORS[1] }} placeholder={initialData.option2} readOnly />
          </div>
          <PieChart width={300} height={300}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </>
  );
}
