import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CallbackPage from "./components/CallbackPage";
import LoginWithKick from "./components/LoginWithKick";
import StrelementsPage from "./components/StrelementsPage";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginWithKick />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="/strelements" element={<StrelementsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
