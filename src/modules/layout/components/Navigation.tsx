import GhostButton2 from "@/shared/components/GhostButton2";
import { MySpinner } from "@/shared/components/Spinner";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { colors2 } from "../../../shared/utils/colors";
import { CONFIG } from "../../../shared/utils/constants";
import { useKickAuthStore } from "../../auth/KickAuthStore";

type Props = {
  relative?: boolean;
};

const Navigation: React.FC<Props> = ({ relative = true }) => {
  const isAuthenticated = useKickAuthStore((state) => state.isAuthenticated);
  const setAuthenticated = useKickAuthStore((state) => state.setAuthenticated);
  const logout = useKickAuthStore((state) => state.logout);
  const login = useKickAuthStore((state) => state.startLoginWithKick);
  const authIsLoading = useKickAuthStore((state) => state.isLoading);
  const status = useKickAuthStore((state) => state.status);
  const setStatus = useKickAuthStore((state) => state.setStatus);

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
          {LogoWithLink()}
          {/* <Link to="/effects" className="ml-4">
            <GhostButton text="Effects" onClick={() => {}} />{" "}
          </Link> */}
        </div>

        <div className="navbar-end">
          {authIsLoading ? (
            <MySpinner />
          ) : isAuthenticated ? (
            <>
              {/* {dashboardButton()}
              <div className="ml-4"></div> */}
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

  // function dashboardButton() {
  //   return (
  //     <GhostButton
  //       text="Try strelements now"
  //       onClick={() => {
  //         window.location.href = "/dashboard";
  //       }}
  //     />
  //   );
  // }

  function loginButton() {
    return (
      <GhostButton2
        text={"Login"}
        onClick={() => {
          login();
        }}
        data-testid="login-button"
      />
    );
  }

  function avatar() {
    return (
      <details className="dropdown dropdown-end">
        <summary className="m-1 cursor-pointer list-none">
          <div className="avatar">
            <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={"/avatar.svg"} alt="Avatar" />
            </div>
          </div>
        </summary>

        <ul
          className="bg-second-bg text-text-primary ring-1 menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow-md mt-2  "
          // style={{ background: colors2.kick }}
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
function LogoWithLink() {
  const isAuthenticated = useKickAuthStore((state) => state.isAuthenticated);
  return (
    <Link to={isAuthenticated ? "/dashboard" : "/"}>
      <img
        src={"/logo2.svg"}
        alt="Logo-ul aplicației"
        style={{ color: colors2.text }}
        className="w-[50px]"
      />
    </Link>
  );
}
