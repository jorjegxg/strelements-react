import { useSocketListener } from "../game/game2/soket";
import { useDasboardStore } from "./dashboardStore";

const Dashboard = () => {
  useSocketListener();

  const { isLive } = useDasboardStore();

  return (
    <div className="flex flex-col justify-start h-screen w-screen bg-gray-100 p-4">
      {isLive ? (
        <p className="bg-red-500 text-white">Live</p>
      ) : (
        <p className="bg-gray-600 text-white">Not live</p>
      )}
      <h1>Strelements dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
};
export default Dashboard;
