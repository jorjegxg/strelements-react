import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import CallbackPage from "./modules/auth/CallbackPage";
import LoginWithKick from "./modules/auth/LoginWithKick";
import CharacterSettingsPage from "./modules/dashboard/CharacterSettingsPage";
import DashboardPage from "./modules/dashboard/DashboardPage";
import DonationPage from "./modules/donation/page";
import EffectsStore from "./modules/effects_store/page";
import FrontPage from "./modules/front_page/page";
import TestPage from "./modules/test/TestPage";
import StrelementsPage from "./modules/testing/StrelementsPage";
import Game2 from "./modules/tiny_walkers/Game2";
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
            <Route path="/effects" element={<EffectsStore />} />
            <Route
              path="/ef1/settings"
              element={
                <ProtectedRoute>
                  <CharacterSettingsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/strelements-original/:sessionId/:isPreview"
              element={<Game2 />}
            />
            <Route
              path="/strelements-original/:sessionId"
              element={<Game2 />}
            />

            <Route path="/test" element={<TestPage />} />
            <Route path="/donation" element={<DonationPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
