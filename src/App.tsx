import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginWithKick from "./features/login/LoginWithKick";
import StrelementsPage from "./features/StrelementsPage";
import CallbackPage from "./modules/auth/CallbackPage";
import DashboardPage from "./modules/dashboard/DashboardPage";
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
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/strelements" element={<StrelementsPage />} />
            <Route path="/game2" element={<Game2 />} />
            <Route
              path="/strelements-original/:sessionId"
              element={<Game2 />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
