import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CallbackPage from "./pages/CallbackPage";
import LoginWithKick from "./pages/LoginWithKick";
import StrelementsPage from "./pages/StrelementsPage";
import Game from "./features/game/Game";
import Game2 from "./features/game/game2/Game2";

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
            <Route path="/game2" element={<Game2 />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
