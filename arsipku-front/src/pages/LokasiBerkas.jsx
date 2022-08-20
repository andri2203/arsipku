import { Add, Edit, Delete, Close } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Box,
  TextField,
  Button,
  ButtonGroup,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useState, useEffect, Fragment } from "react";
import API from "../utils/RestApi";

export default function LokasiBerkas(props) {
  const api = new API();
  const [isUpdate, setUpdate] = useState(null);
  const [data, setData] = useState([]);
  const [dataRuangan, setDataRuangan] = useState([]);
  const [dataPenyimpanan, setDataPenyimpanan] = useState([]);
  const [snackbar, setSnackbar] = useState("");
  const [dialog, setDialog] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [validate, setValidate] = useState([]);

  // field
  const [ruangan, setRuangan] = useState(0);
  const [penyimpanan, setPenyimpanan] = useState(0);
  const [subPenyimpanan, setSubPenyimpanan] = useState(0);

  function handleDialog(event) {
    if (event == "close") {
      if (dialog == "form") {
        // Clear Form
        setUpdate(null);
        setRuangan(0);
        setPenyimpanan(0);
        setSubPenyimpanan(0);
      }
      setDialog("");
    }

    setDialog(event);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ open: false, message: "", status: "" });
  };

  function getDataUsage() {
    setDataRuangan([]);
    setDataPenyimpanan([]);
    setData([]);
    const urls = ["/room", "/storage", "/location"];
    var promises = urls.map((url) => api.get(url));
    Promise.all(promises).then((result) => {
      let res = result;
      setDataRuangan(res[0].data.data);
      setDataPenyimpanan(res[1].data.data);
      setData(res[2].data.data);
    });
  }

  function handleValidation() {
    let entry = [
      { name: "ruangan", value: ruangan },
      { name: "penyimpanan", value: penyimpanan },
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
    let fields = ["room_id", "storage_id", "sub_storage_id"];
    for (const field in fields) {
      if (Object.hasOwnProperty.call(fields, field)) {
        const errField = fields[field];
        var errData = err.response.data[errField];
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
  }

  function tambahLokasiBerkas() {
    let valid = handleValidation();
    if (valid.isValidated) {
      setValidate(valid.data);
      return;
    } else {
      let formData = {
        room_id: ruangan,
        storage_id: penyimpanan,
        sub_storage_id: subPenyimpanan == 0 ? null : subPenyimpanan,
      };

      try {
        props.onLoading(true);
        api
          .post("/location", formData)
          .then((res) => {
            props.onLoading(false);
            handleDialog("close");
            setRuangan(0);
            setPenyimpanan(0);
            setSubPenyimpanan(0);
            setSnackbar({
              open: true,
              message: "Lokasi Penyimpanan Baru Berhasil Ditambahkan",
              status: "success",
            });
            getDataUsage();
          })
          .catch((err) => {
            snackBarCatch(err);
          });
      } catch (error) {
        throw error;
      }
    }
  }

  function editLokasiBerkas() {
    let valid = handleValidation();
    if (valid.isValidated) {
      setValidate(valid.data);
      return;
    } else {
      let formData = {
        room_id: ruangan,
        storage_id: penyimpanan,
        sub_storage_id: subPenyimpanan == 0 ? null : subPenyimpanan,
      };

      try {
        props.onLoading(true);
        api
          .put(`/location/${isUpdate}`, formData)
          .then((res) => {
            props.onLoading(false);
            handleDialog("close");
            setRuangan(0);
            setPenyimpanan(0);
            setSubPenyimpanan(0);
            setSnackbar({
              open: true,
              message: "Lokasi Penyimpanan Berhasil Di Ubah",
              status: "success",
            });
            getDataUsage();
          })
          .catch((err) => {
            snackBarCatch(err);
          });
      } catch (error) {
        throw error;
      }
    }
  }

  function deleteLokasiBerkas(id) {
    handleDialog("close");
    props.onLoading(true);
    try {
      api
        .delete(`/location/${id}`)
        .then((value) => {
          props.onLoading(false);
          setSnackbar({
            open: true,
            message: "Berhasil Menghapus Lokasi",
            status: "success",
          });
          getDataUsage();
        })
        .catch((err) => {
          snackBarCatch(err);
        });
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getDataUsage();
  }, []);

  return (
    <Fragment>
      <Card>
        <CardContent>
          <div className="mb-2">
            <Button
              variant="outlined"
              size="small"
              endIcon={<Add />}
              onClick={() => handleDialog("form")}
            >
              Tambah Data
            </Button>
          </div>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width={5}>NO</TableCell>
                    <TableCell>Lokasi</TableCell>
                    <TableCell width={25}>Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((dt, i) => (
                    <Fragment key={`f-${i}`}>
                      <TableRow>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>
                          {dt.building} {"->"} {dt.roomName} {"->"}{" "}
                          {dt.primaryStorage}
                          {dt.secondaryStorage == null
                            ? ""
                            : ` -> ${dt.secondaryStorage}`}
                        </TableCell>
                        <TableCell>
                          <ButtonGroup>
                            <Button
                              variant="outlined"
                              color="success"
                              size="small"
                              onClick={(ev) => {
                                console.log(dt.id);
                                setUpdate(dt.id);
                                setRuangan(dt.room_id);
                                setPenyimpanan(dt.storage_id);
                                setSubPenyimpanan(
                                  dt.sub_storage_id == null
                                    ? 0
                                    : dt.sub_storage_id
                                );
                                handleDialog("form");
                              }}
                            >
                              <Edit size="small" />
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleDialog("d-" + i)}
                            >
                              <Delete size="small" />
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                      <Dialog
                        key={"d-" + i}
                        open={dialog == "d-" + i ? true : false}
                        onClose={() => handleDialog("close")}
                        aria-labelledby={"d-" + i + "-title"}
                        aria-describedby={"d-" + i + "-description"}
                      >
                        <DialogTitle id={"d-" + i + "-title"}>
                          Yakin ingin di hapus Lokasi ini?
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id={"d-" + i + "-description"}>
                            Lokasi ini akan di hapus secara permanen.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => handleDialog("close")}>
                            Jangan Hapus
                          </Button>
                          <Button
                            onClick={() => deleteLokasiBerkas(dt.id)}
                            color="error"
                            autoFocus
                          >
                            Hapus saja
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </CardContent>
      </Card>
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
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={dialog == "form" ? true : false}
        onClose={() => handleDialog("close")}
      >
        <Box component="form">
          <DialogTitle>
            {isUpdate != null ? "Ubah" : "Tambah"} Lokasi Berkas
          </DialogTitle>
          <DialogContent>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ paddingTop: "0.5rem" }}
            >
              <TextField
                select
                SelectProps={{
                  native: true,
                }}
                label="Ruangan"
                size="small"
                helperText="Ruangan Penyimpanan Disimpan"
                sx={{ marginBottom: "1.25rem" }}
                value={ruangan}
                helperText={
                  validate.indexOf("ruangan") > -1
                    ? "Ruangan Harus Di Pilih"
                    : "Ruangan Penyimpanan"
                }
                error={validate.indexOf("ruangan") > -1 ? true : false}
                onChange={(ev) => {
                  let validateData = validate;
                  if (ev.target.value == 0) {
                    validateData.push("ruangan");
                  } else {
                    if (validate.indexOf("ruangan") > -1) {
                      validateData.splice(validate.indexOf("ruangan"), 1);
                      setValidate(validateData);
                    }
                  }
                  setRuangan(ev.target.value);
                }}
                fullWidth
                required
              >
                <option value={0}>Pilih Ruangan</option>
                {dataRuangan.map((dt, index) => (
                  <option key={"opt1-" + index} value={dt.id}>
                    {dt.buildingName} - {dt.name}
                  </option>
                ))}
              </TextField>
              <TextField
                select
                SelectProps={{
                  native: true,
                }}
                label="Penyimpanan"
                size="small"
                helperText="Penyimpanan Berkas Disimpan"
                sx={{ marginBottom: "1.25rem" }}
                value={penyimpanan}
                helperText={
                  validate.indexOf("penyimpanan") > -1
                    ? "Penyimpanan Harus Di Pilih"
                    : "Penyimpanan Penyimpanan"
                }
                error={validate.indexOf("penyimpanan") > -1 ? true : false}
                onChange={(ev) => {
                  let validateData = validate;
                  if (ev.target.value == 0) {
                    validateData.push("penyimpanan");
                  } else {
                    if (validate.indexOf("penyimpanan") > -1) {
                      validateData.splice(validate.indexOf("penyimpanan"), 1);
                      setValidate(validateData);
                    }
                  }
                  setPenyimpanan(ev.target.value);
                }}
                fullWidth
                required
              >
                <option value={0}>Pilih Penyimpanan</option>
                {dataPenyimpanan
                  .filter((dt, index) => dt.type == "main")
                  .map((dt, index) => (
                    <option key={"opt2-" + index} value={dt.id}>
                      {dt.typeName} - {dt.name}
                    </option>
                  ))}
              </TextField>
              <TextField
                select
                SelectProps={{
                  native: true,
                }}
                label="Sub Penyimpanan"
                size="small"
                helperText="Sub Penyimpanan Berkas Disimpan"
                value={subPenyimpanan}
                onChange={(ev) => setSubPenyimpanan(ev.target.value)}
                fullWidth
              >
                <option value={0}>Pilih Sub Penyimpanan</option>
                {dataPenyimpanan
                  .filter((dt, index) => dt.type == "second")
                  .map((dt, index) => (
                    <option key={"opt3-" + index} value={dt.id}>
                      {dt.typeName} - {dt.name}
                    </option>
                  ))}
              </TextField>
            </Box>
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
              onClick={isUpdate != null ? editLokasiBerkas : tambahLokasiBerkas}
            >
              {isUpdate != null ? "Ubah" : "Tambah"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Fragment>
  );
}
