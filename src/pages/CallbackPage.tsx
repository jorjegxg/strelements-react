import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useAppAuthStore } from "../stores/appAuthStore";

const CallbackPage: React.FC = () => {
  const userLogin = useAppAuthStore((state) => state.userLogin);
  const error = useAppAuthStore((state) => state.error);
  const navigate = useNavigate();
  const isAuthenticated = useAppAuthStore((state) => state.isAuthenticated);

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
    <div>
      <h1>Logging in...</h1>
      <ToastContainer />
    </div>
  );
};

export default CallbackPage;
