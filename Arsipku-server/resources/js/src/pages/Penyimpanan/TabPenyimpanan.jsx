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
import API from "../../utils/RestApi";

export default function TabPenyimpanan(props) {
  const api = new API();
  const [isUpdate, setUpdate] = useState(null);
  const [storageName, setStorageName] = useState("");
  const [storageDesc, setStorageDesc] = useState("");
  const [storageType, setStorageType] = useState(0);
  const [data, setData] = useState([]);
  const [dataTipePenyimpanan, setDataTipePenyimpanan] = useState([]);
  const [snackbar, setSnackbar] = useState("");
  const [dialog, setDialog] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [validate, setValidate] = useState([]);

  const handleValidation = () => {
    let entry = [
      { name: "name", value: storageName },
      { name: "desc", value: storageDesc },
      { name: "type", value: storageType },
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

  useEffect(() => {
    setData(props.dataPenyimpanan);
    setDataTipePenyimpanan(props.dataTipePenyimpanan);
  });

  const onSubmitEvent = (ev) => {
    ev.preventDefault();
    let validation = handleValidation();

    if (validation.isValidated) {
      setValidate(validation.data);
      return;
    }

    try {
      props.onLoading(true);
      api
        .post("/storage", {
          name: storageName,
          desciption: storageDesc,
          storage_type_id: storageType,
        })
        .then((res) => {
          props.onLoading(false);
          setStorageName("");
          setStorageDesc("");
          setStorageType(0);
          props.getData();
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
    ev.preventDefault();
    let validation = handleValidation();

    if (validation.isValidated) {
      setValidate(validation.data);
      return;
    }

    try {
      props.onLoading(true);
      api
        .put("/storage/" + isUpdate, {
          name: storageName,
          desciption: storageDesc,
          storage_type_id: storageType,
        })
        .then((res) => {
          props.onLoading(false);
          setUpdate(null);
          setStorageName("");
          setStorageDesc("");
          setStorageType(0);
          props.getData();
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
  const onDeleteEvent = (id) => {
    handleDialog("close");
    props.onLoading(true);
    try {
      api
        .delete(`/storage/${id}`)
        .then((value) => {
          props.onLoading(false);
          setSnackbar({
            open: true,
            message: "Berhasil Menghapus Data",
            status: "success",
          });
          props.getData();
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

  return (
    <Card>
      <CardContent>
        <Box
          display="flex"
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={isUpdate == null ? onSubmitEvent : onUpdateEvent}
          marginBottom="1rem"
          flexDirection="row"
          justifyContent="space-between"
        >
          <TextField
            label="Nama Penyimpanan"
            size="small"
            fullWidth
            sx={{ marginRight: "0.5rem" }}
            helperText={
              validate.indexOf("name") > -1
                ? "Nama Penyimpanan Harus Di Isi"
                : "Nama Penyimpanan Penyimpanan"
            }
            error={validate.indexOf("name") > -1 ? true : false}
            value={storageName}
            onChange={(ev) => {
              let validateData = validate;
              if (ev.target.value == "") {
                validateData.push("name");
              } else {
                if (validate.indexOf("name") > -1) {
                  validateData.splice(validate.indexOf("name"), 1);
                }
              }
              setStorageName(ev.target.value);
            }}
            required
          />
          <TextField
            select
            SelectProps={{
              native: true,
            }}
            label="Tipe Penyimpanan"
            size="small"
            sx={{ width: "60ch", marginRight: "0.5rem" }}
            helperText={
              validate.indexOf("type") > -1
                ? "Tipe Harus Di Pilih"
                : "Tipe Penyimpanan"
            }
            error={validate.indexOf("type") > -1 ? true : false}
            disabled={dataTipePenyimpanan.length == 0 ? true : false}
            value={storageType}
            onChange={(ev) => {
              let validateData = validate;
              if (ev.target.value == 0) {
                validateData.push("type");
              } else {
                if (validate.indexOf("type") > -1) {
                  validateData.splice(validate.indexOf("type"), 1);
                }
              }
              setStorageType(ev.target.value);
            }}
            required
          >
            <option value={0}>Pilih Tipe</option>
            {dataTipePenyimpanan.map((dt, index) => (
              <option key={"opt-" + index} value={dt.id}>
                {dt.name} - {dt.type}
              </option>
            ))}
          </TextField>
          <TextField
            label="Deskripsi"
            size="small"
            fullWidth
            sx={{ marginRight: "0.5rem" }}
            helperText={
              validate.indexOf("desc") > -1
                ? "Deskripsi Harus Di Isi"
                : "Deskripsi Penyimpanan"
            }
            error={validate.indexOf("desc") > -1 ? true : false}
            value={storageDesc}
            onChange={(ev) => {
              let validateData = validate;
              if (ev.target.value == "") {
                validateData.push("desc");
              } else {
                if (validate.indexOf("desc") > -1) {
                  validateData.splice(validate.indexOf("desc"), 1);
                }
              }
              setStorageDesc(ev.target.value);
            }}
            required
          />
          {isUpdate == null ? (
            <Button
              type="submit"
              variant="outlined"
              sx={{ height: "40px", width: "35ch" }}
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
                  <TableCell width={200}>Nama Penyimpanan</TableCell>
                  <TableCell width={35}>Tipe Penyimpanan</TableCell>
                  <TableCell width={35}>Status Penyimpanan</TableCell>
                  <TableCell>Deskripsi</TableCell>
                  <TableCell width={15}>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((dt, index) => (
                  <Fragment key={"f-" + index}>
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{dt.name}</TableCell>
                      <TableCell>{dt.typeName}</TableCell>
                      <TableCell>{dt.type}</TableCell>
                      <TableCell>{dt.desciption}</TableCell>
                      <TableCell>
                        <ButtonGroup>
                          <Button
                            variant="outlined"
                            color="success"
                            size="small"
                            onClick={(ev) => {
                              setUpdate(dt.id);
                              setStorageName(dt.name);
                              setStorageDesc(dt.desciption);
                              setStorageType(dt.storage_type_id);
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
