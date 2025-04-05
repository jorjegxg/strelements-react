import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <div>
    <div id="root"></div>
    <App />
  </div>
)
