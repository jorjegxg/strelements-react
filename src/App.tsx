import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginWithKick from "./features/login/LoginWithKick";
import StrelementsPage from "./features/StrelementsPage";
import "./index.css";
import CallbackPage from "./modules/auth/CallbackPage";
import CharacterSettingsPage from "./modules/dashboard/components/SettingsModal";
import DashboardPage from "./modules/dashboard/DashboardPage";
import FrontPage from "./modules/front_page/page";
import Game2 from "./modules/little_humans/Game2";
import TestPage from "./modules/test/TestPage";
import ProtectedRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="/login" element={<LoginWithKick />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/strelements"
              element={
                <ProtectedRoute>
                  <StrelementsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/ef1/settings" element={<CharacterSettingsPage />} />
            <Route
              path="/strelements-original/:sessionId/:isPreview"
              element={<Game2 />}
            />
            <Route
              path="/strelements-original/:sessionId"
              element={<Game2 />}
            />

            <Route path="/test" element={<TestPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
