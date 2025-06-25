import { ReactNode } from "react";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

type Props = {
  children: ReactNode;
  relative?: boolean;
};

const Layout: React.FC<Props> = ({ children, relative = true }) => {
  return (
    <>
      <div
        className="w-screen flex flex-col justify-between  bg-bg"
        // style={{ background: colors2.background }}
      >
        <div>
          <Navigation relative={relative} />
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
