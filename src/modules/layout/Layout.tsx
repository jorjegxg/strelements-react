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
      <div className="w-screen flex flex-col justify-between bg-bg h-screen">
        <div>
          <Navigation relative={relative} />
          <main>{children}</main>
        </div>
        <div className="b-0">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
