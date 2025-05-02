import { ReactNode } from "react";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-between ">
        <div>
          <Navigation />
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
