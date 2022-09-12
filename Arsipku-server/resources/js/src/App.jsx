import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import pages from "./utils/Pages";
import Login from "./pages/Login";
import Middleware from "./components/Middleware";
import LoginRedirect from "./components/LoginRedirect";
import { Layout } from "./components/Layout";

function App() {
    const [loading, setLoading] = useState(false);
    return (
        <Router>
            {loading ? (
                <Box
                    sx={{
                        position: "fixed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: 99999,
                    }}
                >
                    <CircularProgress sx={{ marginBottom: "1rem" }} />
                    <span className="text-white">
                        Sedang Memproses. Mohon Tunggu...
                    </span>
                </Box>
            ) : (
                <div></div>
            )}

            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route element={<Middleware />}>
                        {pages.map(
                            ({ Component, toLink, ListIcon, text }, inx) => (
                                <Route
                                    key={inx}
                                    path={toLink}
                                    element={
                                        <Box
                                            sx={{
                                                minHeight:
                                                    "calc(100vh - 95px - 1rem)",
                                                paddingLeft: "1.25rem",
                                                paddingRight: "1.25rem",
                                                boxSizing: "border-box",
                                            }}
                                        >
                                            <div className="d-flex align-items-center mt-1 mb-3 ">
                                                <ListIcon fontSize="large" />
                                                <span className="h3 ms-2 mb-0 text-uppercase">
                                                    {text}
                                                </span>
                                            </div>

                                            <Component
                                                onLoading={(loading) => {
                                                    setLoading(loading);
                                                }}
                                            />
                                        </Box>
                                    }
                                />
                            )
                        )}
                    </Route>
                </Route>
                <Route element={<LoginRedirect />}>
                    <Route
                        key="/login"
                        path="/login"
                        element={
                            <Login
                                onLoading={(loading) => {
                                    setLoading(loading);
                                }}
                            />
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
