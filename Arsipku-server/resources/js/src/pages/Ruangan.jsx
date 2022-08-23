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

export default function Ruangan(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [isUpdate, setUpdate] = useState(null);
  const [room, setRoom] = useState("");
  const [building, setBuilding] = useState(0);
  const [validate, setValidate] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    status: "",
  });
  const [dialog, setDialog] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ open: false, message: "", status: "" });
  };

  const handleDialog = (event) => {
    if (event == "close") {
      setDialog("");
    }

    setDialog(event);
  };

  const api = new API();

  async function getData() {
    try {
      let res = await api.get("/room");
      setData(res.data.data);
    } catch (error) {
      throw error;
    }
  }

  async function getBuildings() {
    try {
      try {
        let res = await api.get("/building");
        setBuildings(res.data.data);
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  const onSubmitEvent = (ev) => {
    ev.preventDefault();

    if (building == 0) {
      setValidate("building_id");
    }

    if (room == "") {
      setValidate("room");
    }

    if (room == "" && building == 0) {
      setValidate("all");
    }

    try {
      props.onLoading(true);
      api
        .post("/room", { building_id: building, name: room })
        .then((res) => {
          props.onLoading(false);
          setBuilding(0);
          setRoom("");
          getData();
          setSnackbar({
            open: true,
            message: "Berhasil Tambah Data : " + res.data.data.name,
            status: "success",
          });
        })
        .catch((err) => {
          props.onLoading(false);
          setSnackbar({
            open: true,
            message: err.response.data.name[0],
            status: "error",
          });
        });
    } catch (error) {
      throw error;
    }
  };

  const onUpdateEvent = (ev) => {
    ev.preventDefault();

    if (building == 0) {
      setValidate("building_id");
    }

    if (room == "") {
      setValidate("room");
    }

    if (room == "" && building == 0) {
      setValidate("all");
    }

    try {
      props.onLoading(true);
      api
        .put("/room/" + isUpdate, { building_id: building, name: room })
        .then((res) => {
          props.onLoading(false);
          setUpdate(null);
          setBuilding(0);
          setRoom("");
          getData();
          setSnackbar({
            open: true,
            message: "Berhasil Ubah Data : " + res.data.data.name,
            status: "success",
          });
        })
        .catch((err) => {
          props.onLoading(false);
          setSnackbar({
            open: true,
            message: err.response.data.name[0],
            status: "error",
          });
        });
    } catch (error) {
      throw error;
    }
  };

  const onDeleteEvent = (id) => {
    handleDialog("close");
    props.onLoading(true);
    try {
      api
        .delete(`/room/${id}`)
        .then((value) => {
          props.onLoading(false);
          setSnackbar({
            open: true,
            message: "Berhasil Menghapus Data",
            status: "success",
          });
          getData();
        })
        .catch((err) => {
          props.onLoading(false);
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

  useEffect(() => {
    getData();
    getBuildings();
  }, []);

  return (
    <Card>
      <CardContent>
        <div className="row">
          <div className="col-md-12 mb-2">
            <Box
              display="flex"
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={isUpdate == null ? onSubmitEvent : onUpdateEvent}
              justifyContent="space-between"
            >
              <TextField
                id="filled-select-currency-native"
                select
                label="Gedung"
                hiddenLabel={false}
                SelectProps={{
                  native: true,
                }}
                value={building}
                helperText={
                  validate == "building_id" || validate == "all"
                    ? "Gedung Harus Dipilih"
                    : "Silahkan Pilih Gedung"
                }
                sx={{ marginRight: "0.5rem" }}
                fullWidth
                size="small"
                name="building_id"
                disabled={buildings.length == 0 ? true : false}
                onChange={(ev) => {
                  if (
                    (validate == "building_id" && ev.target.value != 0) ||
                    (validate == "all" && ev.target.value != 0)
                  ) {
                    if (room == "") {
                      setValidate("room");
                    } else {
                      setValidate("");
                    }
                  }
                  setBuilding(ev.target.value);
                }}
                error={
                  validate == "building_id" || validate == "all" ? true : false
                }
                focused={validate == "building_id" ? true : false}
                required
              >
                <option value={0}>Pilih Gedung</option>
                {buildings.map((dt, index) => (
                  <option key={index} value={dt.id}>
                    {dt.name}
                  </option>
                ))}
              </TextField>
              <TextField
                helperText={
                  validate == "room" || validate == "all"
                    ? "Ruangan Harus Di Isi"
                    : "Nama Ruangan"
                }
                label="Ruangan"
                size="small"
                sx={{ marginRight: "0.5rem" }}
                name="room"
                fullWidth
                value={room}
                onChange={(ev) => {
                  if (
                    (validate == "room" && ev.target.value != 0) ||
                    (validate == "all" && ev.target.value != 0)
                  ) {
                    if (building == 0) {
                      setValidate("building_id");
                    } else {
                      setValidate("");
                    }
                  }
                  setRoom(ev.target.value);
                }}
                error={validate == "room" || validate == "all" ? true : false}
                focused={validate == "room" ? true : false}
                required
              />
              {isUpdate == null ? (
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ height: "40px", width: "30ch" }}
                  endIcon={<Add />}
                  size="small"
                >
                  Tambah
                </Button>
              ) : (
                <ButtonGroup>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ height: "40px", width: "15ch" }}
                    endIcon={<Add />}
                    size="small"
                  >
                    Ubah
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    sx={{ height: "40px", width: "15ch" }}
                    endIcon={<Close />}
                    size="small"
                    color="error"
                    onClick={(ev) => {
                      setUpdate(null);
                      setBuilding(0);
                      setRoom("");
                    }}
                  >
                    Batal
                  </Button>
                </ButtonGroup>
              )}
            </Box>
          </div>
          <div className="col-md-12">
            <Paper>
              <TableContainer>
                <Table aria-label="Caption Table">
                  <TableHead>
                    <TableRow>
                      <TableCell width={5}>No.</TableCell>
                      <TableCell>Nama Gedung</TableCell>
                      <TableCell>Nama Ruangan</TableCell>
                      <TableCell width={15}>Aksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((dt, index) => (
                      <Fragment key={"f-" + index}>
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{dt.buildingName}</TableCell>
                          <TableCell>{dt.name}</TableCell>
                          <TableCell>
                            <ButtonGroup>
                              <Button
                                variant="outlined"
                                color="success"
                                size="small"
                                onClick={(ev) => {
                                  setUpdate(dt.id);
                                  setBuilding(dt.building_id);
                                  setRoom(dt.name);
                                }}
                              >
                                <Edit size="small" />
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleDialog("d-" + index)}
                              >
                                <Delete size="small" />
                              </Button>
                            </ButtonGroup>
                          </TableCell>
                        </TableRow>
                        <Dialog
                          key={"d-" + index}
                          open={dialog == "d-" + index ? true : false}
                          onClose={() => handleDialog("close")}
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
                            <Button onClick={() => handleDialog("close")}>
                              Jangan Hapus
                            </Button>
                            <Button
                              onClick={() => onDeleteEvent(dt.id)}
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
          {" "}
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}
