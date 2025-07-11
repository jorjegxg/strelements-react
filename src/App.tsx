import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import "./index.css";
import KickCallbackPage from "./modules/auth/KickCallbackPage";
import LoginWithKick from "./modules/auth/LoginWithKick";
import CharacterSettingsPage from "./modules/dashboard/CharacterSettingsPage";
import DashboardPage from "./modules/dashboard/DashboardPage";
import OneEffectPage from "./modules/dashboard/pages/OneEffectPage";
import DonationPage from "./modules/donation/DonationPage";
import RainPage from "./modules/effects/rain/RainPage";
import FrontPage from "./modules/front_page/page";
import StripeCallbackPage from "./modules/stripe/StripeCallbackPage";
import Failure from "./modules/stripe/StripeCanceledPage";
import Success from "./modules/stripe/StripeSuccessPage";
import TestPage from "./modules/test/TestPage";
import StrelementsPage from "./modules/testing/StrelementsPage";
import Game2 from "./modules/tiny_walkers/Game2";
import { ProtectedRoute, ProtectedRouteToDashboard } from "./PrivateRoute";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = sessionStorage.getItem("redirectPath");
    if (redirectPath) {
      sessionStorage.removeItem("redirectPath");
      navigate(redirectPath);
    }
  }, [navigate]);

  return (
    <>
      <div>
        <BrowserRouter basename="/strelements-react">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteToDashboard>
                  <FrontPage />
                </ProtectedRouteToDashboard>
              }
            />
            <Route path="/callback" element={<KickCallbackPage />} />
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

            <Route path="/effect/:name" element={<OneEffectPage />} />
            <Route
              path="/tiny-walkers/settings"
              element={
                <ProtectedRoute>
                  <CharacterSettingsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tiny-walkers/:sessionId/:isPreview"
              element={<Game2 />}
            />
            <Route path="/tiny-walkers/:sessionId" element={<Game2 />} />

            <Route path="/test" element={<TestPage />} />
            <Route path="/donate/nectarian" element={<DonationPage />} />
            <Route path="/stripe/success" element={<Success />} />
            <Route path="/stripe/failure" element={<Failure />} />
            <Route path="/stripe/callback" element={<StripeCallbackPage />} />
            <Route path="/rain" element={<RainPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
