import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import GhostButton from "../../../shared/components/GhostButton";
import { colors2 } from "../../../shared/utils/colors";
import { CONFIG } from "../../../shared/utils/constants";
import { useAppAuthStore } from "../../auth/appAuthStore";

type Props = {
  relative?: boolean;
};
const Navigation: React.FC<Props> = ({ relative = true }) => {
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
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [setAuthenticated]);

  return (
    <>
      <div
        className={
          `navbar  top-0 left-0 w-full z-20 px-8` + (relative ? " fixed" : "")
        }
        style={{ background: relative ? "transparent" : colors2.background }}
      >
        <div className="navbar-start">
          <Link to="/">
            <img
              src={"/logo.svg"}
              alt="Logo-ul aplicației"
              style={{ color: colors2.text }}
              className="w-[50px]"
            />
          </Link>
          <Link to="/">
            <GhostButton
              text="Home"
              onClick={() => {
                window.location.href = "/";
              }}
            />{" "}
          </Link>
        </div>

        <div className="navbar-end">
          {authIsLoading ? (
            <span
              className="loading loading-spinner loading-xl"
              style={{ color: colors2.kick }}
            ></span>
          ) : isAuthenticated ? (
            <>
              {dashboardButton()}
              <div className="ml-4"></div>
              {avatar()}
            </>
          ) : (
            <>
              <div className="ml-4"></div>
              {loginButton()}
            </>
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );

  function dashboardButton() {
    return (
      <GhostButton
        text="Try strelements now"
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      />
    );
  }

  function loginButton() {
    return (
      <button
        data-testid="login-button"
        className="btn btn-ghost hover:bg-transparent"
        onClick={() => {
          login();
        }}
        style={{ color: colors2.kick }}
      >
        Login
      </button>
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

        <ul
          className="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow-md mt-2  "
          style={{ background: colors2.kick }}
        >
          {/* <li>
            <div
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              Dashboard
            </div>
          </li> */}
          <li>
            <div
              onClick={() => {
                logout().then(() => (window.location.href = "/"));
              }}
            >
              Logout
            </div>
          </li>
        </ul>
      </details>
    );
  }
};

export default Navigation;
