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
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import { useState, useEffect, Fragment } from "react";
import API from "../../utils/RestApi";

export default function TabTipePenyimpanan(props) {
  const api = new API();
  const [isUpdate, setUpdate] = useState(null);
  const [storageTypeName, setStorageTypeName] = useState("");
  const [storageTypeEnum, setStorageTypeEnum] = useState("");
  const [data, setData] = useState([]);
  const [snackbar, setSnackbar] = useState("");
  const [dialog, setDialog] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [validate, setValidate] = useState("");

  const getData = async () => {
    try {
      let res = await api.get("/storage-type");
      setData(res.data.data);
    } catch (error) {
      throw error;
    }
  };

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

  const onSubmitEvent = (ev) => {
    ev.preventDefault();

    if (storageTypeName == "" && storageTypeEnum == "") {
      setValidate("all");
      console.log("both");
      return;
    }

    if (storageTypeName == "") {
      setValidate("name");
      console.log("name");
      return;
    }

    if (storageTypeEnum == "") {
      setValidate("type");
      console.log("type");
      return;
    }

    try {
      props.onLoading(true);
      api
        .post("/storage-type", { name: storageTypeName, type: storageTypeEnum })
        .then((res) => {
          props.onLoading(false);
          setStorageTypeName("");
          setStorageTypeEnum("");
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

    if (storageTypeName == "" && storageTypeEnum == "") {
      setValidate("all");
      console.log("both");
      return;
    }

    if (storageTypeName == "") {
      setValidate("name");
      console.log("name");
      return;
    }

    if (storageTypeEnum == "") {
      setValidate("type");
      console.log("type");
      return;
    }

    try {
      props.onLoading(true);
      api
        .put("/storage-type/" + isUpdate, {
          name: storageTypeName,
          type: storageTypeEnum,
        })
        .then((res) => {
          props.onLoading(false);
          setUpdate(null);
          setStorageTypeName("");
          setStorageTypeEnum("");
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
        .delete(`/storage-type/${id}`)
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
  }, []);

  return (
    <Card>
      <CardContent>
        <Box
          display="flex"
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={isUpdate == null ? onSubmitEvent : onUpdateEvent}
          marginBottom="0.35rem"
          flexDirection="row"
          justifyContent="space-around"
        >
          <TextField
            label="Tipe Penyimpanan"
            variant="outlined"
            size="small"
            helperText={
              validate == "name" || validate == "all"
                ? "Harus Disis"
                : "Tipe Penyimpanan"
            }
            sx={{ width: "50ch" }}
            SelectProps={{
              native: true,
            }}
            onChange={(ev) => {
              if (
                (validate == "name" && ev.target.value != 0) ||
                (validate == "all" && ev.target.value != 0)
              ) {
                if (storageTypeEnum == "") {
                  setValidate("type");
                } else {
                  setValidate("");
                }
              }
              setStorageTypeName(ev.target.value);
            }}
            value={storageTypeName}
            error={validate == "name" || validate == "all" ? true : false}
            focused={validate == "name" ? true : false}
            required
          />
          <FormControl
            color={
              validate == "type" || validate == "all" ? "error" : "primary"
            }
            focused={validate == "type" || validate == "all" ? true : false}
            required
          >
            <FormLabel>Status Penyimpanan</FormLabel>
            <RadioGroup
              row
              onChange={(ev, value) => {
                if (validate == "type" || validate == "all") {
                  if (storageTypeName == "") {
                    setValidate("name");
                  } else {
                    setValidate("");
                  }
                }
                setStorageTypeEnum(value);
              }}
              value={storageTypeEnum}
            >
              <FormControlLabel
                value="main"
                control={<Radio size="small" />}
                label="Main"
                labelPlacement="end"
              />
              <FormControlLabel
                value="second"
                control={<Radio size="small" />}
                label="Second"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
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
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={5}>No.</TableCell>
                  <TableCell>Tipe Penyimpanan</TableCell>
                  <TableCell>Status Penyimpanan</TableCell>
                  <TableCell width={15}>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((dt, index) => (
                  <Fragment key={"f-" + index}>
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{dt.name}</TableCell>
                      <TableCell>{dt.type}</TableCell>
                      <TableCell>
                        <ButtonGroup>
                          <Button
                            variant="outlined"
                            color="success"
                            size="small"
                            onClick={(ev) => {
                              setUpdate(dt.id);
                              setStorageTypeName(dt.name);
                              setStorageTypeEnum(dt.type);
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
                        <DialogContentText id={"d-" + index + "-description"}>
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
