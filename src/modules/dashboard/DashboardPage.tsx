import { CopyOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLiveSoket } from "../little_humans/soket";
import { useDasboardStore } from "./dashboardStore";

const DashboardPage = () => {
  useLiveSoket();

  const { isLive } = useDasboardStore();

  return (
    <div className="flex flex-col  justify-start h-screen w-screen bg-gray-100">
      <h1>Strelements dashboard</h1>
      {isLive ? (
        <p className="bg-red-500 text-white">Live</p>
      ) : (
        <p className="bg-gray-600 text-white">Not live</p>
      )}
      <div className="flex justify-start items-start h-screen w-screen bg-gray-100 p-4">
        <EffectComponent textToCopy="httpschimba/feasfefeaf/aefeafaef" />
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

const EffectComponent = ({ textToCopy }: { textToCopy: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      toast.success("Text copiat!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Eroare la copiere");
    }
  };

  return (
    <div className="px-8 py-4 flex justify-between items-center w-full ring-2 ring-gray-300 rounded-lg bg-white shadow-sm">
      <div className="flex space-x-2">
        <UsergroupAddOutlined />
        <h2>Little men</h2>
      </div>
      <div className="flex space-x-2">
        <p className="bg-gray-300 justify-center items-center p-2 rounded-md">
          https://lijkghsauighbiasehbglkiaegflaealefkin.com
        </p>
        <button
          onClick={handleCopy}
          className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          title={copied ? "Copied!" : "Copy"}
        >
          <CopyOutlined
            style={{ fontSize: "16px", color: copied ? "green" : "black" }}
          />
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
