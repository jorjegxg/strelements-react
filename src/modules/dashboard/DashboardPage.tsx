import { LinkIcon, User, Zap } from "lucide-react";
import { useState } from "react";
import Layout from "../layout/Layout";
import AccountPage from "./pages/AccountPage";
import DonationsLinkPage from "./pages/DonationsLinkPage";
import { EffectsPage } from "./pages/EffectsPage";

const items = [
  { id: 1, title: "Effects", icon: Zap },
  { id: 2, title: "Donation Links", icon: LinkIcon },
  { id: 3, title: "Account", icon: User },
  // { id: 4, title: "Settings", icon: Settings },
];

const DashboardPage = () => {
  const [selectedId, setSelectedId] = useState(items[0].id);

  const renderContent = () => {
    switch (selectedId) {
      case 1:
        return EffectsPage();
      case 2:
        return DonationsLinkPage();
      case 3:
        return AccountPage();
      // case 4:
      //   return SettingsPage();
      default:
        return <p>Select a menu item</p>;
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
          <div className="drawer-content p-8">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden mt-4"
            >
              Open dashboard
            </label>
            {renderContent()}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </Layout>
  );
};

export default DashboardPage;
