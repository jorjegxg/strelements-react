import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { CONFIG } from "../../../shared/utils/constants";
import { useAppAuthStore } from "../../auth/appAuthStore";

const Navigation = () => {
  const isAuthenticated = useAppAuthStore((state) => state.isAuthenticated);
  const setAuthenticated = useAppAuthStore((state) => state.setAuthenticated);
  const logout = useAppAuthStore((state) => state.logout);
  const login = useAppAuthStore((state) => state.login);
  const authIsLoading = useAppAuthStore((state) => state.isLoading);
  const status = useAppAuthStore((state) => state.status);
  const setStatus = useAppAuthStore((state) => state.setStatus);

  useEffect(() => {
    if (status.name === "error") {
      toast.error(status.message);
      setStatus("idle", "");
    } else if (status.name === "success") {
      toast.success(status.message);
      setStatus("idle", "");
    }
  }, [status]);

  useEffect(() => {
    const token = localStorage.getItem(CONFIG.localStorage.kickAcessToken);
    if (token) {
      console.log("Token found in local storage:", token);
      setAuthenticated(true);
    } else {
      console.log("No token found in local storage.");
      setAuthenticated(false);
    }
  }, [setAuthenticated]);

  return (
    <>
      <div className="navbar ">
        <div className="navbar-start">
          <img src={"./vite.svg"} alt="Logo-ul aplicației" className="logo" />
        </div>

        <div className="navbar-end">
          {authIsLoading ? (
            <span className="loading loading-spinner loading-xl"></span>
          ) : isAuthenticated ? (
            <>
              {dashboardButton(isAuthenticated)}
              <div className="ml-4"></div>
              {avatar()}
            </>
          ) : (
            <>
              {dashboardButton(isAuthenticated)}
              <div className="ml-4"></div>
              {loginButton()}
            </>
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );

  function dashboardButton(isAuthenticated: boolean) {
    if (isAuthenticated)
      return (
        <button
          data-testid="dashboard-button"
          className="btn btn-outline btn-primary"
          onClick={() => {
            if (isAuthenticated) window.location.href = "/dashboard";
          }}
        >
          Try strelements now
        </button>
      );
  }

  function loginButton() {
    return (
      <div className="bg-white p-6">
        <button
          data-testid="login-button"
          className="btn btn-outline btn-primary"
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
      </div>
    );
  }

  function avatar() {
    return (
      <details className="dropdown dropdown-end">
        <summary className="m-1 cursor-pointer list-none">
          <div className="avatar">
            <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={"./avatar.svg"} alt="Avatar" />
            </div>
          </div>
        </summary>

        <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow-md mt-2">
          <li className="text-red-400">
            <div className="" onClick={() => logout()}>
              Logout
            </div>
          </li>
        </ul>
      </details>
    );
  }
};

export default Navigation;
