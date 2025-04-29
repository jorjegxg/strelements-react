import { createRoot } from "react-dom/client";
import App from "./App";
import "./index";

createRoot(document.getElementById("root")!).render(
  <div>
    <div id="root"></div>
    <App />
  </div>
);
