import "./Content.css";
import { useState } from "react";
import { Tab, Box } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";

export default function Content(props) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="content">
      {/* <div className="nav">
        <Apps className="btn-hide-side" onClick={props.sidebarHide} />
        <ul className="navTabsList">
          <li className="tabsListItem">
            <span className="tabsTitle">Beranda</span>
            <span className="tabsClose">x</span>
          </li>
          <li className="tabsListItem">
            <span className="tabsTitle">Cari</span>
            <span className="tabsClose">x</span>
          </li>
          <li className="tabsListItem">
            <span className="tabsTitle">Laporan</span>
            <span className="tabsClose">x</span>
          </li>
          <li className="tabsListItem">
            <Tab label="Test" value="1" />
          </li>
        </ul>
      </div> */}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
