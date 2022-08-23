import { Typography, Box, Card, CardContent, Button } from "@mui/material";
import { Home, AttachFile, FolderOpen, Warehouse } from "@mui/icons-material";
// import { DataGrid } from "@mui/x-data-grid";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Beranda() {
    const { auth } = useAuthContext();
    return (
        <>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box sx={{ flex: "1 0 auto" }}>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                    >
                                        Jumlah Berkas
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="p"
                                        component="div"
                                    >
                                        1,000,000 Berkas
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "10px",
                                        color: "var(--bs-indigo)",
                                    }}
                                >
                                    <AttachFile fontSize="large" />
                                </Box>
                            </Box>
                            <Button
                                sx={{ marginTop: "10px" }}
                                size="small"
                                onClick={() => {
                                    console.log(
                                        "Data : ",
                                        localStorage.getItem("token")
                                    );
                                    console.log(auth);
                                }}
                            >
                                Lihat Semua Berkas
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-md-4 mb-3">
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                    >
                                        Total Penyimpanan
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="p"
                                        component="div"
                                    >
                                        12 Penyimpanan
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "10px",
                                        color: "var(--bs-orange)",
                                    }}
                                >
                                    <FolderOpen fontSize="large" />
                                </Box>
                            </Box>
                            <Button sx={{ marginTop: "10px" }} size="small">
                                Lihat Semua Penyimpanan
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-md-4 mb-3">
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                    >
                                        Total Ruangan
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="p"
                                        component="div"
                                    >
                                        4 Ruangan
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "10px",
                                        color: "var(--bs-blue)",
                                    }}
                                >
                                    <Warehouse fontSize="large" />
                                </Box>
                            </Box>
                            <Button sx={{ marginTop: "10px" }} size="small">
                                Lihat Semua Ruangan
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Card>
                <CardContent></CardContent>
            </Card>
            {/* Main Content */}
        </>
    );
}
