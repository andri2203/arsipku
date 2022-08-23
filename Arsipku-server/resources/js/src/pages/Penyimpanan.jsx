import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState, useEffect } from "react";
import TabPenyimpanan from "./Penyimpanan/TabPenyimpanan";
import TabTipePenyimpanan from "./Penyimpanan/TabTipePenyimpanan";
import API from "../utils/RestApi";

export default function Penyimpanan(props) {
  const api = new API();
  const [tabValue, setTabValue] = useState("1");
  const [dataPenyimpanan, setDataPenyimpanan] = useState([]);
  const [dataTipePenyimpanan, setDataTipePenyimpanan] = useState([]);

  const handleChangeTab = (ev, value) => {
    setTabValue(value);
  };

  const getDataTipePenyimpanan = async () => {
    try {
      let res = await api.get("/storage-type");
      setDataTipePenyimpanan(res.data.data);
    } catch (error) {
      throw error;
    }
  };

  const getDataPenyimpanan = async () => {
    try {
      let res = await api.get("/storage");
      setDataPenyimpanan(res.data.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getDataTipePenyimpanan();
    getDataPenyimpanan();
  }, []);

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
        <TabPenyimpanan
          onLoading={props.onLoading}
          dataPenyimpanan={dataPenyimpanan}
          dataTipePenyimpanan={dataTipePenyimpanan}
          getData={() => {
            getDataPenyimpanan();
          }}
        />
      </TabPanel>
      <TabPanel value="2" sx={{ paddingLeft: "0", paddingRight: "0" }}>
        <TabTipePenyimpanan
          onLoading={props.onLoading}
          dataTipePenyimpanan={dataTipePenyimpanan}
          getData={() => {
            getDataTipePenyimpanan();
          }}
        />
      </TabPanel>
    </TabContext>
  );
}
