// Viewer.tsx

import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { CONFIG } from "../../shared/utils/constants";

export default function TestPage() {
  const { rive, RiveComponent } = useRive({
    src: "/iepuras.riv",
    stateMachines: "State Machine 1", // Numele mașinii de stare
    autoplay: true,
  });

  const color = useStateMachineInput(rive, "State Machine 1", "culoare");

  return (
    <div className="App">
      <header className="App-header">
        <p>Aceasta este o pagină de test cu fundal transparent.</p>
        <button
          onClick={async () => {
            localStorage.setItem(
              CONFIG.localStorage.kickTokenExpiresAt,
              String(Date.now() - 1000)
            );
          }}
        >
          Afiseaza datele din localstorage
        </button>
      </header>
      <div className="w-screen h-[500px]">
        <RiveComponent />
      </div>
      <button
        className="btn btn-outline px-6 mt-16"
        onClick={() => {
          if (color !== null) {
            color.value = 1;
          }
        }}
      >
        efect 1
      </button>
      <button
        className="btn btn-outline px-6 mt-16"
        onClick={() => {
          if (color !== null) {
            color.value = 2;
          }
        }}
      >
        efect 2
      </button>
      <button
        className="btn btn-outline px-6 mt-16"
        onClick={() => {
          if (color !== null) {
            color.value = 3;
          }
        }}
      >
        efect 3
      </button>
    </div>
  );
}
