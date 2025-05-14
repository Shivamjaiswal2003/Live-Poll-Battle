// src/pages/ChooseActionPage.jsx
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./ChooseActionPage.css";

export default function ChooseActionPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="choose-page">
        <h2>Welcome, {localStorage.getItem("username")}</h2>
        <button onClick={() => navigate("/create")}>Create a Poll Room</button>
        <br />
        <button onClick={() => navigate("/join")}>Join existing Poll Room</button>
      </div>
    </>
  );
}
