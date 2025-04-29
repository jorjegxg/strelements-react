import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginWithKick from "./features/login/LoginWithKick";
import StrelementsPage from "./features/StrelementsPage";
import CallbackPage from "./modules/auth/CallbackPage";
// import Game from "./features/game/Game";
import Dashboard from "./modules/dashboard/page";
import FrontPage from "./modules/front_page/page";
import Game2 from "./modules/little_humans/Game2";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/callback" element={<CallbackPage />} />

            <Route path="/login" element={<LoginWithKick />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
