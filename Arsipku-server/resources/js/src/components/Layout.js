import { Outlet, Link } from "react-router-dom";
import { IconButton, Typography, Box } from "@mui/material";
import { Person } from "@mui/icons-material";
import SwipeDrawer from "./SwipeDrawer";

export const Layout = () => {
    return (
        <Box display="flex" flexDirection="row">
            <div
                className="d-flex flex-column position-relative"
                style={{
                    backgroundColor: "var(--bs-gray-100)",
                    marginLeft: "200px",
                    width: "100vw",
                }}
            >
                <nav
                    className="d-flex w-100 align-items-center justify-content-between mb-3 px-3 py-3 bg-white border-bottom shadow-sm"
                    style={{ height: "45px" }}
                >
                    <Typography
                        sx={{
                            padding: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        ARSIPAPP
                    </Typography>
                    <div className="d-flex">
                        <IconButton onClick={() => {}}>
                            <Person />
                        </IconButton>
                    </div>
                </nav>
                <Outlet />
                <footer className="clearfix">
                    <div
                        className="d-flex px-3 justify-content-between align-items-center border-top bg-white"
                        style={{ height: "40px" }}
                    >
                        <Typography fontSize="small">
                            Copyright &copy; {new Date().getFullYear()}. All
                            Right Reserved
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
    );
};
