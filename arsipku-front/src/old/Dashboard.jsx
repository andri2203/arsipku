import { useState } from "react";
import "./dashboard.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";

import Content from "./components/Content/Content";

function Dashboard() {
  const [sideHide, setSideHide] = useState(true);
  // const floatAction = () => setSideHide(!sideHide);

  return (
    <div className="wrapper">
      <Topbar />
      <div className={`container ${sideHide ? "show" : ""}`}>
        <Sidebar />
        <Content sidebarHide={() => setSideHide(!sideHide)} />
      </div>
    </div>
  );
}

export default Dashboard;
