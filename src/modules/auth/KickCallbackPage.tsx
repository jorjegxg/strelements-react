import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { colors2 } from "../../shared/utils/colors";
import { useKickAuthStore } from "./KickAuthStore";

const KickCallbackPage: React.FC = () => {
  const userLogin = useKickAuthStore((state) => state.getKickAuthToken);
  const error = useKickAuthStore((state) => state.error);
  const navigate = useNavigate();
  const isAuthenticated = useKickAuthStore((state) => state.isAuthenticated);

  const notify = (message: string) =>
    toast.error(`❌ ${message}`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });

  useEffect(() => {
    userLogin();
  }, []);

  useEffect(() => {
    if (error) {
      notify(error);
      setTimeout(() => navigate("/"), 2000);
    } else if (isAuthenticated) {
      navigate("/");
    }
  }, [error, isAuthenticated]);

  return (
    <div
      className="w-screen h-screen flex items-center justify-center "
      style={{ background: colors2.background }}
    >
      <h1 style={{ color: colors2.kick }}>Logging in...🦾</h1>
      <ToastContainer />
    </div>
  );
};

export default KickCallbackPage;
