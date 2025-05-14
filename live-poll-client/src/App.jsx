import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnterNamePage from "./pages/EnterNamePage";
import ChooseActionPage from "./pages/ChooseActionPage";
import CreatePollPage from "./pages/CreatePollPage";
import JoinPollPage from "./pages/JoinPollPage";
import VotingPage from "./pages/VotingPage";
import VotingEndedPage from "./pages/VotingEndedPage";
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnterNamePage />} />
        <Route path="/choose" element={<ChooseActionPage />} />
        <Route path="/create" element={<CreatePollPage />} />
        <Route path="/join" element={<JoinPollPage />} />
        <Route path="/vote/:roomId" element={<VotingPage />} />
        <Route path="/ended/:roomId" element={<VotingEndedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
