import {
    Card,
    CardHeader,
    CardMedia,
    CardActions,
    CardContent,
    ButtonGroup,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
    Box,
    TextField,
    Snackbar,
    Alert,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
} from "@mui/material";
import {
    Add,
    Edit,
    Delete,
    Close,
    TableChart,
    List,
    Autorenew,
    ArrowForward,
} from "@mui/icons-material";
import { useState, useEffect, Fragment } from "react";
import API from "../utils/RestApi";

export default function Cari() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const api = new API();

    function fetchDataApi(loading = false) {
        setData([]);
        api.get("/file").then((res) => {
            setData(res.data.data);
        });
    }

    useEffect(() => {
        fetchDataApi();
    }, []);

    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ width: "100%", transition: "width 0.5s" }}>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell width={5}>NO</TableCell>
                                            <TableCell>Nomor Berkas</TableCell>
                                            <TableCell>Tipe Berkas</TableCell>
                                            <TableCell>Kegiatan</TableCell>
                                            <TableCell>PPTK</TableCell>
                                            <TableCell>Jenis Berkas</TableCell>
                                            <TableCell>Lokasi</TableCell>
                                            <TableCell width={20}>
                                                Input Oleh
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((dt, i) => (
                                            <TableRow
                                                key={"data-" + dt.id + "-" + i}
                                            >
                                                <TableCell>{i + 1}</TableCell>
                                                <TableCell>
                                                    {dt.nomor_berkas}
                                                </TableCell>
                                                <TableCell>
                                                    {dt.tipe_berkas}
                                                </TableCell>
                                                <TableCell>
                                                    {dt.kegiatan}
                                                </TableCell>
                                                <TableCell>{dt.pptk}</TableCell>
                                                <TableCell>
                                                    {dt.jenis_berkas}
                                                </TableCell>
                                                <TableCell>
                                                    {dt.building} {" -> "}
                                                    {dt.roomName} {" -> "}
                                                    {dt.primaryStorage}
                                                    {dt.secondaryStorage == null
                                                        ? ""
                                                        : "-> " +
                                                          dt.secondaryStorage}
                                                </TableCell>
                                                <TableCell>
                                                    {dt.userName}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={(event, newPage) => {
                                    setPage(newPage);
                                }}
                                onRowsPerPageChange={(event) => {
                                    setRowsPerPage(event.target, value);
                                    setPage(0);
                                }}
                            />
                        </Paper>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
