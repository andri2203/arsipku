import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
  TextField,
  ButtonGroup,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useEffect, useRef, useState, Fragment } from "react";
import API from "../utils/RestApi";
import { Add, Edit, Delete, Close } from "@mui/icons-material";

export default function Gedung() {
  // Initialize Variables
  const reference = useRef(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    status: "",
  });
  const [validate, setValidate] = useState(false);
  const [gedung, setGedung] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [dialog, setDialog] = useState("");
  const [form, setForm] = useState({
    status: "create",
    id: null,
  });
  const api = new API();

  // function
  async function getData() {
    try {
      let res = await api.get("/building");
      setData(res.data.data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ open: false, message: "", status: "" });
  };

  const onSubmitEvent = (ev) => {
    ev.preventDefault();

    if (gedung == "") {
      setValidate(true);
    }

    try {
      if (form.status == "create") {
        api
          .post("/building", { name: gedung })
          .then((res) => {
            setGedung("");
            getData();
            setSnackbar({
              open: true,
              message: "Berhasil Tambah Data : " + res.data.data.name,
              status: "success",
            });
          })
          .catch((err) => {
            reference.current.childNodes[1].firstChild.focus();
            setSnackbar({
              open: true,
              message: err.response.data.name[0],
              status: "error",
            });
          });
      } else {
        api
          .put("/building/" + form.id, { name: gedung })
          .then((res) => {
            setGedung("");
            setForm({
              status: "create",
              id: null,
            });
            getData();
            setSnackbar({
              open: true,
              message: "Berhasil Ubah Data : " + res.data.data.name,
              status: "success",
            });
          })
          .catch((err) => {
            reference.current.childNodes[1].firstChild.focus();
            setSnackbar({
              open: true,
              message: err.response.data.name[0],
              status: "error",
            });
          });
      }
    } catch (error) {
      throw error;
    }
  };

  const handleOpenDialog = (key) => setDialog(key);
  const handleCloseDialog = () => setDialog("");
  const handleDeleteData = (id) => {
    handleCloseDialog();

    try {
      api
        .delete(`/building/${id}`)
        .then((value) => {
          setSnackbar({
            open: true,
            message: "Berhasil Menghapus Data",
            status: "success",
          });
          getData();
        })
        .catch((err) => {
          setSnackbar({
            open: true,
            message: err.response.data.id[0],
            status: "error",
          });
        });
    } catch (error) {
      throw error;
    }
  };

  const handleUpdate = (id, name) => {
    reference.current.childNodes[1].firstChild.focus();
    setGedung(name);
    setForm({
      status: "update",
      id: id,
    });
  };

  return (
    <Card>
      <CardContent>
        <div className="row">
          <div className="col-md-5">
            <Box
              display="flex"
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={onSubmitEvent}
              flexDirection="column"
            >
              <TextField
                id="gedungI"
                className="mb-2"
                ref={reference}
                label="Gedung"
                variant="outlined"
                size="small"
                helperText={
                  validate
                    ? "Nama Gedung harus di Isi"
                    : form.status == "create"
                    ? "Tambah Nama Gedung"
                    : "Ubah Nama Gedung : " + gedung
                }
                onChange={(ev) => {
                  if (validate == true) {
                    setValidate(false);
                  }
                  if (ev.currentTarget.value == "") {
                    setValidate(true);
                  }
                  setGedung(ev.currentTarget.value);
                }}
                error={validate}
                focused={validate}
                value={gedung}
                required
              />
              {form.status == "create" ? (
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ width: "100px" }}
                  endIcon={<Add />}
                >
                  Tambah
                </Button>
              ) : (
                <ButtonGroup>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ width: "100px" }}
                    endIcon={<Edit />}
                  >
                    Ubah
                  </Button>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ width: "100px" }}
                    endIcon={<Close />}
                    color="error"
                    onClick={() => {
                      setForm({
                        status: "create",
                        id: null,
                      });
                      setGedung("");
                    }}
                  >
                    Batal
                  </Button>
                </ButtonGroup>
              )}
            </Box>
          </div>
          <div className="col-md-7">
            <Paper>
              <TableContainer>
                <Table aria-label="Caption Table">
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell>Nama Gedung</TableCell>
                      <TableCell>Aksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((dt, index) => (
                      <Fragment key={"f-" + index}>
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{dt.name}</TableCell>
                          <TableCell>
                            <ButtonGroup>
                              <Button
                                variant="outlined"
                                color="success"
                                size="small"
                                onClick={() => handleUpdate(dt.id, dt.name)}
                              >
                                <Edit fontSize="small" />
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleOpenDialog("d-" + index)}
                              >
                                <Delete fontSize="small" />
                              </Button>
                            </ButtonGroup>
                          </TableCell>
                        </TableRow>
                        <Dialog
                          key={"d-" + index}
                          open={dialog == "d-" + index ? true : false}
                          onClose={handleCloseDialog}
                          aria-labelledby={"d-" + index + "-title"}
                          aria-describedby={"d-" + index + "-description"}
                        >
                          <DialogTitle id={"d-" + index + "-title"}>
                            Yakin ingin di hapus "{dt.name}"?
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText
                              id={"d-" + index + "-description"}
                            >
                              Data "{dt.name}" akan di hapus secara permanen.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseDialog}>
                              Jangan Hapus
                            </Button>
                            <Button
                              onClick={() => handleDeleteData(dt.id)}
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
          </div>
        </div>
      </CardContent>
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
    </Card>
  );
}
