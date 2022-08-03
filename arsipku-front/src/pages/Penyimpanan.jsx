import { Card, CardContent, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import TabPenyimpanan from "./Penyimpanan/TabPenyimpanan";
import TabTipePenyimpanan from "./Penyimpanan/TabTipePenyimpanan";

export default function Penyimpanan(props) {
  const [tabValue, setTabValue] = useState("2");

  const handleChangeTab = (ev, value) => {
    setTabValue(value);
  };

  return (
    <TabContext value={tabValue}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          paddingBottom: "0.25rem",
        }}
      >
        <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
          <Tab label="Penyimpanan" value="1" />
          <Tab label="Tipe Penyimpanan" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1" sx={{ paddingLeft: "0", paddingRight: "0" }}>
        <TabPenyimpanan onLoading={props.onLoading} />
      </TabPanel>
      <TabPanel value="2" sx={{ paddingLeft: "0", paddingRight: "0" }}>
        <TabTipePenyimpanan onLoading={props.onLoading} />
      </TabPanel>
    </TabContext>
  );
}
