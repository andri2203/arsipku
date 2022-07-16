import React from "react";
import "./topbar.css";

import { Settings, NotificationsNone, Language } from "@material-ui/icons";

export default function Topbar(props) {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ARSIPAPP</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://pbs.twimg.com/profile_images/1207511591064723457/L1TCMMiP_400x400.jpg"
            alt=""
            className="topImageAvatar"
          />
        </div>
      </div>
    </div>
  );
}
