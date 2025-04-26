import { useEffect } from "react";
import { useAppAuthStore } from "../../stores/appAuthStore";
import { CONFIG } from "../../utils/constants";

const Navigation = () => {
  const { isAuthenticated, setAuthenticated, logout, login } =
    useAppAuthStore();

  useEffect(() => {
    const token = localStorage.getItem(CONFIG.localStorage.accessToken);
    if (token) {
      console.log("Token found in local storage:", token);
      setAuthenticated(true);
    } else {
      console.log("No token found in local storage.");
      setAuthenticated(false);
    }
  }, [setAuthenticated]);

  return (
    <div className="navbar ">
      <div className="navbar-start">
        <img src={"./vite.svg"} alt="Logo-ul aplicației" className="logo" />
      </div>

      {isAuthenticated ? (
        <>
          <div className="navbar-end">
            {dashboardButton(isAuthenticated)}
            <div className="ml-4"></div>
            {avatar()}
          </div>
        </>
      ) : (
        <>
          <div className="navbar-end">
            {dashboardButton(isAuthenticated)}
            <div className="ml-4"></div>
            {loginButton()}
          </div>
        </>
      )}
    </div>
  );

  function dashboardButton(isAuthenticated: boolean) {
    if (isAuthenticated)
      return (
        <button
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
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Avatar"
              />
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
