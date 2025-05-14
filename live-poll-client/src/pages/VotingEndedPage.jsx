import { useLocation, useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./VotingEndedPage.css";

export default function VotingEndedPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const votes = location.state?.votes || { option1: 0, option2: 0 };
  const initialData = location.state?.initialData || {
    option1: "Option 1",
    option2: "Option 2",
  };

  const votedOption =
    localStorage.getItem(`voted_${roomId}`) === "true"
      ? "Yes"
      : "No vote recorded";

  return (
    <>
      <Header />
      <div className="ended-container">
        <h2>Voting Ended!</h2>
        <p className="voted-info">You voted: <strong>{votedOption}</strong></p>

        <div className="result-box">
          <p>Final Votes:</p>
          <div className="result-item">
            <span>{initialData.option1}:</span>
            <span>{votes.option1} votes</span>
          </div>
          <div className="result-item">
            <span>{initialData.option2}:</span>
            <span>{votes.option2} votes</span>
          </div>
        </div>

        <div className="ended-buttons">
          <button onClick={() => navigate("/choose")}>Create New Poll</button>
          <button onClick={() => navigate("/")}>Leave Room</button>
        </div>
      </div>
    </>
  );
}
