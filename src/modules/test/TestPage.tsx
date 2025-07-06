import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceNumber,
  useViewModelInstanceString,
} from "@rive-app/react-canvas";
import { useEffect } from "react";

// Tip pentru datele unui stock
type StockData = {
  ticker: string;
  num: number;
};

export const RiveDemo = () => {
  const { RiveComponent, rive } = useRive({
    src: "/rive/exemplu_string_data_bind.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    autoBind: false, // Control manual pentru performanță mai bună
    artboard: "Artboard",
  });

  // 1. Obținem ViewModel-ul principal
  const viewModel = useViewModel(rive, { name: "Dashboard" });
  const viewModelInstance = useViewModelInstance(viewModel, { rive });

  // 2. Inițializăm ViewModel-urile pentru fiecare companie
  const appleStock = viewModelInstance?.viewModel("apple");
  const microsoftStock = viewModelInstance?.viewModel("Microsoft");
  const teslaStock = viewModelInstance?.viewModel("Tesla");

  // 3. Hook-uri pentru proprietăți
  // Text principal
  const { setValue: setMainText } = useViewModelInstanceString(
    "ceva",
    viewModelInstance
  );

  // Apple
  const { setValue: setAppleTicker } = useViewModelInstanceString(
    "ticker",
    appleStock
  );
  const { setValue: setAppleNum } = useViewModelInstanceNumber(
    "num",
    appleStock
  );

  // Microsoft
  const { setValue: setMicrosoftTicker } = useViewModelInstanceString(
    "ticker",
    microsoftStock
  );
  const { setValue: setMicrosoftNum } = useViewModelInstanceNumber(
    "num",
    microsoftStock
  );

  // Tesla
  const { setValue: setTeslaTicker } = useViewModelInstanceString(
    "ticker",
    teslaStock
  );
  const { setValue: setTeslaNum } = useViewModelInstanceNumber(
    "num",
    teslaStock
  );

  // 4. Inițializare date
  useEffect(() => {
    if (!rive) return;

    setMainText("Stock Dashboard");

    // Valori inițiale
    updateStock("AAPL", 182.63, "MSFT", 328.39, "TSLA", 180.54);
  }, [rive]);

  // 5. Funcție pentru actualizare centralizată
  const updateStock = (
    appleTicker: string,
    applePrice: number,
    msftTicker: string,
    msftPrice: number,
    tslaTicker: string,
    tslaPrice: number
  ) => {
    setAppleTicker(appleTicker);
    setAppleNum(applePrice);

    setMicrosoftTicker(msftTicker);
    setMicrosoftNum(msftPrice);

    setTeslaTicker(tslaTicker);
    setTeslaNum(tslaPrice);
  };

  // 6. Handler pentru buton (update random)
  const handleRandomUpdate = () => {
    const randomChange = (base: number) =>
      ((Math.random() * 2 - 1) * base).toFixed(2);

    updateStock(
      "AAPL",
      parseFloat(randomChange(180)),
      "MSFT",
      parseFloat(randomChange(320)),
      "TSLA",
      parseFloat(randomChange(170))
    );
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="w-[500px] h-[500px] border rounded-lg overflow-hidden">
        <RiveComponent />
      </div>

      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() =>
            updateStock("AAPL", 182.63, "MSFT", 328.39, "TSLA", 180.54)
          }
        >
          Reset Stocks
        </button>

        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={handleRandomUpdate}
        >
          Random Update
        </button>
      </div>
    </div>
  );
};

export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Stock Market Dashboard
        </h1>
        <p className="text-gray-600">Powered by Rive Data Binding</p>
      </header>
      <RiveDemo />
    </div>
  );
}
