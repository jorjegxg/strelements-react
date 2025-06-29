// Viewer.tsx

import Logger from "@/shared/utils/Logger";
import { CONFIG } from "../../shared/utils/constants";

export default function TestPage() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Aceasta este o pagină de test cu fundal transparent.</p>
        <button
          className="btn"
          onClick={async () => {
            localStorage.setItem(
              CONFIG.localStorage.kickTokenExpiresAt,
              String(Date.now() - 1000)
            );
            const expiresAt = Number(
              localStorage.getItem(CONFIG.localStorage.kickTokenExpiresAt)
            );

            Logger.log(
              "Kick token will expire at date : " +
                new Date(expiresAt).getDate() +
                " / " +
                new Date(expiresAt).getMonth() +
                " / " +
                new Date(expiresAt).getFullYear()
            );
          }}
        >
          Afiseaza datele din localstorage
        </button>
      </header>
    </div>
  );
}
