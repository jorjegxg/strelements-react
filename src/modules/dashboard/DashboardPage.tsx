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
        return <div>Content for Effects</div>;
      case 2:
        return <div>Content for Donation Links</div>;
      case 3:
        return <div>Content for Account</div>;
      case 4:
        return <div>Content for Settings</div>;
      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <div className="bg-bg">
      <Layout relative={false}>
        <div className="drawer lg:drawer-open ">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
          <div className="drawer-side ">
            <ul className="menu bg-base-200 text-text-primary min-h-full w-80 p-4 bg-third-bg">
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
      </Layout>
    </div>
  );
};

export default DashboardPage;
