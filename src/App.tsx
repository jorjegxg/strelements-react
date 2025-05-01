import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginWithKick from "./features/login/LoginWithKick";
import StrelementsPage from "./features/StrelementsPage";
import "./index.css";
import CallbackPage from "./modules/auth/CallbackPage";
import DashboardPage from "./modules/dashboard/DashboardPage";
import FrontPage from "./modules/front_page/page";
import Game2 from "./modules/little_humans/Game2";
import TestPage from "./modules/test/TestPage";
import ProtectedRoute from "./PrivateRoute";
import { CONFIG } from "./shared/utils/constants";

function App() {
  const authToken = localStorage.getItem(CONFIG.localStorage.kickAcessToken);

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
                <ProtectedRoute authToken={authToken}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/strelements"
              element={
                <ProtectedRoute authToken={authToken}>
                  <StrelementsPage />
                </ProtectedRoute>
              }
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
