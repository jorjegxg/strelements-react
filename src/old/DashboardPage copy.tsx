import { CopyOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import IconButton from "../modules/dashboard/components/IconButton";
import {
  Dashboard,
  useDasboardStore,
} from "../modules/dashboard/dashboardStore";
import { useSwitchStore } from "../modules/dashboard/store/switchStore";
import Layout from "../modules/layout/Layout";
import { useLiveSoket } from "../modules/tiny_walkers/soket";
import { colors2 } from "../shared/utils/colors";
import { CONFIG } from "../shared/utils/constants";
// import { CONFIG } from "../../shared/utils/constants";

const DashboardPage = () => {
  useLiveSoket();
  const userId = localStorage.getItem(CONFIG.localStorage.kickUserId);
  const sessionId = userId;
  const link = `https://strelements.com/strelements-original/${sessionId}`;

  const navigate = useNavigate();
  const createSession = () => {
    navigate(`/strelements-original/${sessionId}/preview`);
  };

  const isLive = useDasboardStore((state: Dashboard) => state.isLive);

  return (
    <Layout relative={false}>
      <div
        className={`p-8  h-screen`}
        style={{ background: colors2.background }}
      >
        <div className="flex flex-col items-s justify-start space-y-4">
          {isLive ? (
            <p
              className="text-white rounded-md"
              style={{ background: colors2.error }}
            >
              You are live
            </p>
          ) : (
            <p
              className=" text-white rounded-md"
              style={{ background: colors2.secondary }}
            >
              You are not live
            </p>
          )}

          <div className="flex flex-col justify-center items-center ">
            <EffectComponent textToCopy={link} />

            <button
              className="btn btn-outline px-6 mt-16"
              style={{ background: "transparent", color: colors2.text }}
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

export const EffectComponent = ({ textToCopy }: { textToCopy: string }) => {
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const isActive = useSwitchStore((state) => state.isActive);
  const isLoading = useSwitchStore((state) => state.isLoading);
  const toggleState = useSwitchStore((state) => state.toggleState);
  const getEffectsState = useSwitchStore((state) => state.getEffectsState);
  const getIsLive = useDasboardStore((state) => state.getIsLive);

  useEffect(() => {
    getEffectsState();
    getIsLive();
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
    <div
      className="px-8 py-4 flex justify-between items-center w-full ring-2  rounded-lg  shadow-sm space-x-8
      max-sm:flex-col max-sm:items-start max-sm:space-y-2"
      style={{ background: colors2.secondary }}
    >
      <div className="flex items-center  space-x-2">
        <IconButton
          onClick={() => {
            navigate("/ef1/settings");
          }}
        />

        {/* <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} /> */}

        <UsergroupAddOutlined style={{ color: colors2.text }} />
        <h2>Tiny Walkers</h2>

        <input
          type="checkbox"
          defaultChecked
          className="toggle"
          checked={isActive}
          onChange={toggleState}
          disabled={isLoading}
          style={{ color: colors2.text, background: colors2.secondary }}
        />
      </div>
      <div className="flex max-sm:w-full max-sm:justify-between ">
        <div className="flex flex-col md:flex-row md:flex-wrap space-y-2 md:space-y-0 md:space-x-2 items-center">
          <p className="max-lg:hidden ">
            Copy this link into obs browser source:
          </p>
          <p
            className=" p-2 rounded-xl break-all text-wrap max-md:max-w-[250px] text-start"
            style={{ background: colors2.background }}
          >
            {/* {cutString(textToCopy, 18, 1)} */}
            {textToCopy}
          </p>
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
