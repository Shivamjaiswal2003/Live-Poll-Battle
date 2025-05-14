import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./EnterNamePage.css";

export default function EnterNamePage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (name.trim()) {
      localStorage.setItem("username", name);
      navigate("/choose");
    } else {
      alert("Please enter your name");
    }
  };

  return (
    <div className="page-container">
      <Header />
      <div className="main-content">
        <div className="input-box">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
          />
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
}
