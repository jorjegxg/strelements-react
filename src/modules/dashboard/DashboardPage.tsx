import { CopyOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useSwitchStore } from "../../features/stores/switchStore";
import { CONFIG } from "../../shared/utils/constants";
import Layout from "../layout/Layout";
import { useLiveSoket } from "../little_humans/soket";
import { Dashboard, useDasboardStore } from "./dashboardStore";
// import { CONFIG } from "../../shared/utils/constants";

const DashboardPage = () => {
  useLiveSoket();
  const userId = localStorage.getItem(CONFIG.localStorage.kickUserId);
  const sessionId = userId;
  const link = `https://strelements-original/${sessionId}`;

  const navigate = useNavigate();
  const createSession = () => {
    navigate(`/strelements-original/${sessionId}`);
  };

  const isLive = useDasboardStore((state: Dashboard) => state.isLive);

  return (
    <Layout relative={false}>
      <div className="p-8">
        <div className="flex flex-col items-s justify-start space-y-4">
          {isLive ? (
            <p className="bg-red-500 text-white rounded-md">You are live</p>
          ) : (
            <p className="bg-gray-600 text-white rounded-md">
              You are not live
            </p>
          )}

          <div className="flex flex-col justify-center items-center ">
            <EffectComponent textToCopy={link} />

            <button
              className="btn btn-outline btn-primary w-100 mt-4"
              onClick={createSession}
            >
              See efects in action
            </button>
          </div>

          <ToastContainer position="bottom-right" autoClose={2000} />
        </div>
      </div>
    </Layout>
  );
};

const EffectComponent = ({ textToCopy }: { textToCopy: string }) => {
  const [copied, setCopied] = useState(false);
  const isActive = useSwitchStore((state) => state.isActive);
  const isLoading = useSwitchStore((state) => state.isLoading);
  const toggleState = useSwitchStore((state) => state.toggleState);
  const getEffectsState = useSwitchStore((state) => state.getEffectsState);

  useEffect(() => {
    getEffectsState();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      toast.success("Text copied to clipboard!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to copy text!");
    }
  };

  return (
    <div className="px-8 py-4 flex justify-between items-center w-full ring-2 ring-gray-300 rounded-lg bg-white shadow-sm space-x-8">
      <div className="flex space-x-2">
        <UsergroupAddOutlined />
        <h2>Little men</h2>

        <input
          type="checkbox"
          defaultChecked
          className="toggle"
          checked={isActive}
          onChange={toggleState}
          disabled={isLoading}
        />
      </div>
      <div className="flex">
        <div className="flex flex-col md:flex-row md:flex-wrap space-y-2 md:space-y-0 md:space-x-2 items-center">
          <p>Copy this link into obs browser source:</p>
          <p className="bg-gray-300 p-2 rounded-xl break-all">{textToCopy}</p>
        </div>
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
