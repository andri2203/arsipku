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
import { useState, useEffect } from "react";
import API from "../utils/RestApi";

export default function Berkas(props) {
    const [dialog, setDialog] = useState("");
    const [update, setUpdate] = useState(false);
    const [snackbar, setSnackbar] = useState("");
    const [data, setData] = useState([]);
    const [dataLokasi, setDataLokasi] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [validate, setValidate] = useState([]);

    const [nomorBerkas, setNomorBerkas] = useState("");
    const [tipeBerkas, setTipeBerkas] = useState("");
    const [kegiatan, setKegiatan] = useState("");
    const [pptk, setPptk] = useState("");
    const [jenisBerkas, setJenisBerkas] = useState("");
    const [foto, setFoto] = useState({});
    const [lokasiID, setLokasiID] = useState(0);

    const [imageUrl, setImageUrl] = useState("");
    const [author, setAuthor] = useState("");
    const [readOnly, setReadOnly] = useState(true);

    const api = new API();

    const handleDialog = function (event) {
        if (event == "close") {
            if (dialog == "form-create") {
                setDialog("");
            } else {
                setDialog("");
            }
        } else {
            setDialog(event);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbar({ open: false, message: "", status: "" });
    };

    function fetchDataApi(loading = false) {
        if (loading) props.onLoading(true);
        setData([]);
        setDataLokasi([]);
        const urls = ["/location", "/file"];
        const promises = urls.map((url) => api.get(url));
        Promise.all(promises).then((res) => {
            setDataLokasi(res[0].data.data);
            setData(res[1].data.data);
            if (loading) props.onLoading(false);
        });
    }

    useEffect(() => {
        fetchDataApi();
    }, []);

    function handleValidation() {
        let entry = [
            { name: "nomorBerkas", value: nomorBerkas },
            { name: "tipeBerkas", value: tipeBerkas },
            { name: "kegiatan", value: kegiatan },
            { name: "pptk", value: pptk },
            { name: "jenisBerkas", value: jenisBerkas },
            { name: "foto", value: foto },
            { name: "lokasiID", value: lokasiID },
        ];

        let validation = [];

        for (let i = 0; i < entry.length; i++) {
            const data = entry[i];
            if (data.value == "" || data.value == 0) {
                validation.push(data.name);
            }
        }

        return {
            data: validation,
            isValidated: validation.length != 0 ? true : false,
        };
    }

    function snackBarCatch(err) {
        props.onLoading(false);
        let fields = [
            "nomor_berkas",
            "tipe_berkas",
            "kegiatan",
            "pptk",
            "jenis_berkas",
            "foto",
            "location_id",
        ];
        for (const field in fields) {
            const errField = fields[field];
            var errData = err?.response?.data.errors[errField];
            if (errData != undefined) {
                for (let i = 0; i < errData.length; i++) {
                    const message = errData[i];
                    setSnackbar({
                        open: true,
                        message: message,
                        status: "error",
                    });
                }
            }
        }
    }

    function onSubmit() {
        let validate = handleValidation();
        if (validate.isValidated) {
            setValidate(validate.data);
            return;
        } else {
            let formData = new FormData();
            formData.append("nomor_berkas", nomorBerkas);
            formData.append("tipe_berkas", tipeBerkas);
            formData.append("kegiatan", kegiatan);
            formData.append("pptk", pptk);
            formData.append("jenis_berkas", jenisBerkas);
            formData.append("foto", foto);
            formData.append("location_id", lokasiID);
            console.log(formData);
            props.onLoading(true);
            api.post("/file", formData, {
                headers: { Content_type: "multipart/form-data" },
            })
                .then((res) => {
                    props.onLoading(false);
                    handleDialog("close");
                    fetchDataApi();
                    setNomorBerkas("");
                    setTipeBerkas("");
                    setKegiatan("");
                    setPptk("");
                    setJenisBerkas("");
                    setFoto({});
                    setLokasiID(0);
                    setSnackbar({
                        open: true,
                        message: "Lokasi Penyimpanan Baru Berhasil Ditambahkan",
                        status: "success",
                    });
                    getDataUsage();
                })
                .catch((err) => {
                    console.log({ err, mes: "Terjadi Kesalahan" });
                    props.onLoading(false);
                    snackBarCatch(err);
                });
        }
    }

    const FormComponent = () => (
        <Box
            display="flex"
            flexDirection="column"
            sx={{ paddingTop: "0.5rem" }}
        >
            <TextField
                disabled={readOnly}
                variant="outlined"
                label="Nomor Berkas"
                size="small"
                sx={{ marginBottom: "1.25rem" }}
                value={nomorBerkas}
                helperText={
                    validate.indexOf("nomorBerkas") > -1
                        ? "Nomor Berkas Harus Di Pilih"
                        : "Nomor Berkas"
                }
                error={validate.indexOf("nomorBerkas") > -1 ? true : false}
                onChange={(ev) => {
                    let validateData = validate;
                    if (ev.target.value == "") {
                        validateData.push("nomorBerkas");
                    } else {
                        if (validate.indexOf("nomorBerkas") > -1) {
                            validateData.splice(
                                validate.indexOf("nomorBerkas"),
                                1
                            );
                            setValidate(validateData);
                        }
                    }
                    setNomorBerkas(ev.target.value);
                }}
                required
            />
            <TextField
                disabled={readOnly}
                variant="outlined"
                label="Tipe Berkas"
                size="small"
                sx={{ marginBottom: "1.25rem" }}
                value={tipeBerkas}
                helperText={
                    validate.indexOf("tipeBerkas") > -1
                        ? "Tipe Berkas Harus Di Pilih"
                        : "Tipe Berkas"
                }
                error={validate.indexOf("tipeBerkas") > -1 ? true : false}
                onChange={(ev) => {
                    let validateData = validate;
                    if (ev.target.value == "") {
                        validateData.push("tipeBerkas");
                    } else {
                        if (validate.indexOf("tipeBerkas") > -1) {
                            validateData.splice(
                                validate.indexOf("tipeBerkas"),
                                1
                            );
                            setValidate(validateData);
                        }
                    }
                    setTipeBerkas(ev.target.value);
                }}
                required
            />
            <TextField
                disabled={readOnly}
                variant="outlined"
                label="Kegiatan"
                size="small"
                sx={{ marginBottom: "1.25rem" }}
                value={kegiatan}
                helperText={
                    validate.indexOf("kegiatan") > -1
                        ? "Kegiatan Harus Di Pilih"
                        : "Kegiatan"
                }
                error={validate.indexOf("kegiatan") > -1 ? true : false}
                onChange={(ev) => {
                    let validateData = validate;
                    if (ev.target.value == "") {
                        validateData.push("kegiatan");
                    } else {
                        if (validate.indexOf("kegiatan") > -1) {
                            validateData.splice(
                                validate.indexOf("kegiatan"),
                                1
                            );
                            setValidate(validateData);
                        }
                    }
                    setKegiatan(ev.target.value);
                }}
                required
            />
            <TextField
                disabled={readOnly}
                variant="outlined"
                label="PPTK"
                size="small"
                sx={{ marginBottom: "1.25rem" }}
                value={pptk}
                helperText={
                    validate.indexOf("pptk") > -1
                        ? "PPTK Harus Di Pilih"
                        : "PPTK"
                }
                error={validate.indexOf("pptk") > -1 ? true : false}
                onChange={(ev) => {
                    let validateData = validate;
                    if (ev.target.value == "") {
                        validateData.push("pptk");
                    } else {
                        if (validate.indexOf("pptk") > -1) {
                            validateData.splice(validate.indexOf("pptk"), 1);
                            setValidate(validateData);
                        }
                    }
                    setPptk(ev.target.value);
                }}
                required
            />
            <TextField
                disabled={readOnly}
                variant="outlined"
                label="Jenis Berkas"
                size="small"
                sx={{ marginBottom: "1.25rem" }}
                value={jenisBerkas}
                helperText={
                    validate.indexOf("jenisBerkas") > -1
                        ? "Jenis Berkas Harus Di Pilih"
                        : "Jenis Berkas"
                }
                error={validate.indexOf("jenisBerkas") > -1 ? true : false}
                onChange={(ev) => {
                    let validateData = validate;
                    if (ev.target.value == "") {
                        validateData.push("jenisBerkas");
                    } else {
                        if (validate.indexOf("jenisBerkas") > -1) {
                            validateData.splice(
                                validate.indexOf("jenisBerkas"),
                                1
                            );
                            setValidate(validateData);
                        }
                    }
                    setJenisBerkas(ev.target.value);
                }}
                required
            />
            <TextField
                disabled={readOnly}
                select
                SelectProps={{
                    native: true,
                }}
                label="Lokasi Penyimpanan"
                size="small"
                sx={{ marginBottom: "0.75rem" }}
                value={lokasiID}
                helperText={
                    validate.indexOf("lokasiID") > -1
                        ? "Lokasi Penyimpanan Berkas Harus Di Pilih"
                        : "Lokasi Penyimpanan Berkas"
                }
                error={validate.indexOf("lokasiID") > -1 ? true : false}
                onChange={(ev) => {
                    let validateData = validate;
                    if (ev.target.value == 0) {
                        validateData.push("lokasiID");
                    } else {
                        if (validate.indexOf("lokasiID") > -1) {
                            validateData.splice(
                                validate.indexOf("lokasiID"),
                                1
                            );
                            setValidate(validateData);
                        }
                    }
                    setLokasiID(ev.target.value);
                }}
                fullWidth
                required
            >
                <option value={0}>Pilih Lokasi Penyimpanan</option>
                {dataLokasi.map((dt, i) => (
                    <option key={"lokasi-" + dt.id + "-" + i} value={dt.id}>
                        {dt.building} {" -> "}
                        {dt.roomName} {" -> "}
                        {dt.primaryStorage}
                        {dt.secondaryStorage == null
                            ? ""
                            : "-> " + dt.secondaryStorage}
                    </option>
                ))}
            </TextField>
            <div>
                <label htmlFor="formFileSm" className="form-label">
                    Foto Berkas
                </label>
                <input
                    disabled={readOnly}
                    accept="image/*"
                    className="form-control"
                    id="formFileSm"
                    type="file"
                    onChange={(event) => {
                        setFoto(event.target.files[0]);
                    }}
                    required
                />
            </div>
        </Box>
    );

    return (
        <>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                    }}
                >
                    <ButtonGroup>
                        <Button
                            variant="outlined"
                            size="small"
                            endIcon={<Add />}
                            onClick={() => {
                                setNomorBerkas("");
                                setTipeBerkas("");
                                setKegiatan("");
                                setPptk("");
                                setJenisBerkas("");
                                setFoto({});
                                setLokasiID(0);
                                setUpdate(false);
                                setImageUrl("");
                                handleDialog("form-create");
                            }}
                        >
                            Tambah Berkas
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            color="success"
                            endIcon={<Autorenew />}
                            onClick={() => fetchDataApi(true)}
                        >
                            Refresh Data
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button
                            variant="outlined"
                            size="small"
                            endIcon={<TableChart />}
                        >
                            Mode Tabel
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            endIcon={<List />}
                        >
                            Mode List
                        </Button>
                    </ButtonGroup>
                </Box>
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
                                                <TableCell width={5}>
                                                    NO
                                                </TableCell>
                                                <TableCell>
                                                    Nomor Berkas
                                                </TableCell>
                                                <TableCell>Lokasi</TableCell>
                                                <TableCell width={25}>
                                                    Aksi
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.map((dt, i) => (
                                                <TableRow
                                                    key={
                                                        "data-" +
                                                        dt.id +
                                                        "-" +
                                                        i
                                                    }
                                                >
                                                    <TableCell>
                                                        {i + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {dt.nomor_berkas}
                                                    </TableCell>
                                                    <TableCell>
                                                        {dt.building} {" -> "}
                                                        {dt.roomName} {" -> "}
                                                        {dt.primaryStorage}
                                                        {dt.secondaryStorage ==
                                                        null
                                                            ? ""
                                                            : "-> " +
                                                              dt.secondaryStorage}
                                                    </TableCell>
                                                    <TableCell>
                                                        <ButtonGroup>
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                endIcon={
                                                                    <Delete />
                                                                }
                                                                color="error"
                                                                onClick={() => {}}
                                                            >
                                                                Ubah
                                                            </Button>
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                color="success"
                                                                endIcon={
                                                                    <ArrowForward />
                                                                }
                                                                onClick={() => {
                                                                    setUpdate(
                                                                        true
                                                                    );
                                                                    setNomorBerkas(
                                                                        dt.nomor_berkas
                                                                    );
                                                                    setTipeBerkas(
                                                                        dt.tipe_berkas
                                                                    );
                                                                    setKegiatan(
                                                                        dt.kegiatan
                                                                    );
                                                                    setPptk(
                                                                        dt.pptk
                                                                    );
                                                                    setJenisBerkas(
                                                                        dt.jenis_berkas
                                                                    );
                                                                    setImageUrl(
                                                                        dt.foto
                                                                    );
                                                                    setLokasiID(
                                                                        dt.location_id
                                                                    );
                                                                    setAuthor(
                                                                        dt.userName
                                                                    );
                                                                }}
                                                            >
                                                                Lihat
                                                            </Button>
                                                        </ButtonGroup>
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
                        {!update ? (
                            <Box></Box>
                        ) : (
                            <Card
                                sx={{
                                    width: "calc(40vw - 1rem)",
                                    minHeight: "50vh",
                                    marginLeft: "1rem",
                                }}
                            >
                                {!update ? (
                                    <CardContent></CardContent>
                                ) : (
                                    <>
                                        <CardHeader
                                            title={nomorBerkas}
                                            subheader={
                                                "Di Buat Oleh : " + author
                                            }
                                            action={
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => {
                                                        setReadOnly(!readOnly);
                                                    }}
                                                    color={
                                                        readOnly
                                                            ? "primary"
                                                            : "error"
                                                    }
                                                >
                                                    {readOnly
                                                        ? "Ubah"
                                                        : "Batal"}
                                                </Button>
                                            }
                                        />
                                        <CardMedia
                                            component="img"
                                            width="100%"
                                            image={imageUrl}
                                            alt={imageUrl}
                                        />
                                        <CardContent>
                                            <FormComponent />
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="error"
                                                endIcon={<Close />}
                                                onClick={() => {
                                                    setUpdate(false);
                                                    setNomorBerkas("");
                                                    setTipeBerkas("");
                                                    setKegiatan("");
                                                    setPptk("");
                                                    setJenisBerkas("");
                                                    setFoto({});
                                                    setImageUrl("");
                                                    setLokasiID(0);
                                                    setAuthor("");
                                                }}
                                            >
                                                Tutup
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                endIcon={<Edit />}
                                                onClick={() => {
                                                    if (!readOnly) {
                                                        // Logika Update
                                                    } else {
                                                        setSnackbar({
                                                            open: true,
                                                            message:
                                                                "Form Edit Tidak Aktif.",
                                                            status: "error",
                                                        });
                                                    }
                                                }}
                                            >
                                                Ubah
                                            </Button>
                                        </CardActions>
                                    </>
                                )}
                            </Card>
                        )}
                    </Box>
                </CardContent>
            </Box>
            <Dialog
                fullWidth={true}
                open={dialog == "form-create" ? true : false}
                onClose={() => handleDialog("close")}
            >
                <Box component="form">
                    <DialogTitle>Tambah Berkas</DialogTitle>
                    <DialogContent>
                        <FormComponent />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            endIcon={<Close />}
                            onClick={() => handleDialog("close")}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            endIcon={<Add />}
                            onClick={onSubmit}
                        >
                            {update != null ? "Ubah" : "Tambah"}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={snackbar.status === "" ? "info" : snackbar.status}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}
