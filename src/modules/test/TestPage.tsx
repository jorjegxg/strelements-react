// Viewer.tsx

import { CONFIG } from "../../shared/utils/constants";

export default function TestPage() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Aceasta este o pagină de test cu fundal transparent.</p>
        <button
          onClick={async () => {
            console.log("ceBoooneaf");

            const exp = localStorage.getItem(
              CONFIG.localStorage.kickTokenExpiresAt
            );
            console.log("expires ", exp);

            localStorage.setItem(
              CONFIG.localStorage.kickTokenExpiresAt,
              String(Date.now() - 1000)
            );
          }}
        >
          Afiseaza datele din localstorage
        </button>
      </header>
    </div>
  );
}
