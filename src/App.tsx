import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CallbackPage from './components/CallbackPage'
import LoginWithKick from './components/LoginWithKick'

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginWithKick />} />
            <Route path="/callback" element={<CallbackPage />} />
          </Routes>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
