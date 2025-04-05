import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CallbackPage from "./pages/CallbackPage";
import LoginWithKick from "./pages/LoginWithKick";
import StrelementsPage from "./pages/StrelementsPage";
import Game from "./features/game/Game";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginWithKick />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="/strelements" element={<StrelementsPage />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
