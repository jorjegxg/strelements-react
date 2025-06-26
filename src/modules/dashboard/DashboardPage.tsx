import GhostButton2 from "@/shared/components/GhostButton2";
import { LinkIcon, Settings, User, Zap } from "lucide-react";
import { useState } from "react";
import Layout from "../layout/Layout";

const items = [
  { id: 1, title: "Effects", icon: Zap },
  { id: 2, title: "Donation Links", icon: LinkIcon },
  { id: 3, title: "Account", icon: User },
  { id: 4, title: "Settings", icon: Settings },
];

const DashboardPage = () => {
  const [selectedId, setSelectedId] = useState(items[0].id);

  const renderContent = () => {
    switch (selectedId) {
      case 1:
        return <p>Content for Effects</p>;
      case 2:
        return DonationSection();
      case 3:
        return <p>Content for Account</p>;
      case 4:
        return <p>Content for Settings</p>;
      default:
        return <p>Select a menu item</p>;
    }

    function DonationSection() {
      return (
        <div>
          <GhostButton2
            text={"Connect with stripe"}
            onClick={() =>
              (window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${process.env.STRIPE_REDIRECT_URL}&state=dashboard`)
            }
          />
          <p className="pt-4">Give us your IBAN securely thru stripe</p>
        </div>
      );
    }
  };

  return (
    <Layout relative={false}>
      <div className="bg-bg">
        <div className="drawer lg:drawer-open ">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
          <div className="drawer-side ">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-text-primary min-h-full w-80 p-4 bg-third-bg rounded-r-xl">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={
                    selectedId === item.id
                      ? "bg-primary text-text-primary bg-second-bg rounded-xl"
                      : ""
                  }
                >
                  <a
                    href="#!"
                    onClick={() => setSelectedId(item.id)}
                    className="flex items-center gap-2"
                  >
                    <item.icon />
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="drawer-content flex flex-col items-center justify-center p-4">
            {renderContent()}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden mt-4"
            >
              Open drawer
            </label>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </Layout>
  );
};

export default DashboardPage;
