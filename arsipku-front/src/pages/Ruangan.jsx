import { Add } from "@mui/icons-material";
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
import { useState, useEffect, useRef } from "react";
import API from "../utils/RestApi";

export default function Ruangan() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [isUpdate, setUpdate] = useState(null);
  const [room, setRoom] = useState("");
  const [building, setBuilding] = useState(0);
  const [validate, setValidate] = useState("");

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
      api
        .post("/room", { building_id: building, name: room })
        .then((res) => {
          setBuilding(0);
          setRoom("");
          getData();
          console.log("Berhasil Tambah Data : " + res.data.data.name);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      throw error;
    }
  };

  const onUpdateEvent = (ev) => {
    ev.preventDefault();
  };

  const onDeleteEvent = () => {};

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
              <Button
                type="submit"
                variant="outlined"
                sx={{ height: "40px", width: "30ch" }}
                endIcon={<Add />}
                size="small"
              >
                Tambah
              </Button>
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
                      <TableCell>Aksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((dt, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{dt.buildingName}</TableCell>
                        <TableCell>{dt.name}</TableCell>
                        <TableCell>Aksi</TableCell>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
