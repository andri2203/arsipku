import { useState } from "react";
import {
  IconButton,
  Typography,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  ListSubheader,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import pages from "./utils/Pages";
import SwipeDrawer from "./components/SwipeDrawer";

function App() {
  const [state, setstate] = useState(false);
  return (
    <Router>
      <Box display="flex" flexDirection="row">
        <div
          className="d-flex flex-column position-relative"
          style={{
            backgroundColor: "var(--bs-gray-100)",
            marginLeft: "250px",
            width: "100vw",
          }}
        >
          {/* Navigation & Header */}
          <nav
            className="d-flex w-100 align-items-center justify-content-between mb-3 px-3 py-3 bg-white border-bottom shadow-sm"
            style={{ height: "45px" }}
          >
            <Typography
              sx={{ padding: "8px", cursor: "pointer", fontWeight: "bold" }}
            >
              ARSIPAPP
            </Typography>
            <div className="d-flex">
              <IconButton onClick={() => {}}>
                <Person />
              </IconButton>
            </div>
          </nav>
          {/* Conter Area */}
          <Box
            sx={{
              minHeight: "calc(100vh - 95px - 1rem)",
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
              boxSizing: "border-box",
            }}
          >
            <Routes>
              {pages.map(({ Component, toLink, ListIcon, text }, inx) => (
                <Route
                  key={inx}
                  path={toLink}
                  element={
                    <>
                      <div className="d-flex align-items-center mt-1 mb-3 ">
                        <ListIcon fontSize="large" />
                        <span className="h3 ms-2 mb-0 text-uppercase">
                          {text}
                        </span>
                      </div>
                      <Component />
                    </>
                  }
                />
              ))}
            </Routes>
          </Box>
          {/* Footer */}
          <footer className="clearfix">
            <div
              className="d-flex px-3 justify-content-between align-items-center border-top bg-white"
              style={{ height: "40px" }}
            >
              <Typography fontSize="small">
                Copyright &copy; {new Date().getFullYear()}. All Right Reserved
              </Typography>
              <Typography fontSize="small">
                Powered By {<Link to="/">Raden Andri Pratama</Link>}
              </Typography>
            </div>
          </footer>
        </div>
        {/* Swipe Drawer Area */}
        <SwipeDrawer subHeader="Menu Utama" />
      </Box>
    </Router>
  );
}

export default App;
