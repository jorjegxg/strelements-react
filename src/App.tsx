import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginWithKick from "./features/login/LoginWithKick";
import CallbackPage from "./pages/CallbackPage";
import StrelementsPage from "./pages/StrelementsPage";
// import Game from "./features/game/Game";
import Dashboard from "./features/dashboard/Dashboard";
import FrontPage from "./features/front_page/FrontPage";
import Game2 from "./features/game/game2/Game2";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginWithKick />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<FrontPage />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="/strelements" element={<StrelementsPage />} />
            {/* <Route path="/game" element={<Game />} /> */}
            <Route path="/game2" element={<Game2 />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
