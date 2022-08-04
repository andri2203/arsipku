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

export default function LokasiBerkas() {
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

  function handleDialog(event) {
    if (event == "close") {
      if (dialog == "form") {
        // Clear Form
      }
      setDialog("");
    }

    setDialog(event);
  }

  function getRuanganDanPenyimpanan() {
    const urls = ["/room", "/storage"];
    var promises = urls.map((url) => api.get(url));
    Promise.all(promises).then((result) => {
      let res = result;
      setDataRuangan(res[0].data.data);
      setDataPenyimpanan(res[1].data.data);
    });
  }

  useEffect(() => {
    getRuanganDanPenyimpanan();
  }, []);

  return (
    <Fragment>
      <Card>
        <CardContent>
          <Button
            variant="outlined"
            size="small"
            endIcon={<Add />}
            onClick={() => handleDialog("form")}
          >
            Tambah Data
          </Button>
          <Button
            onClick={() => {
              let data = dataPenyimpanan;
              console.log(
                dataPenyimpanan.filter((dt, index) => dt.type == "main")
              );
            }}
          >
            Penyimpanan
          </Button>
          <Button
            onClick={() => {
              let data = dataPenyimpanan;
              console.log(
                dataPenyimpanan.filter((dt, index) => dt.type == "second")
              );
            }}
          >
            Sub Penyimpanan
          </Button>
        </CardContent>
      </Card>
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={dialog == "form" ? true : false}
        onClose={() => handleDialog("close")}
      >
        <Box component="form">
          <DialogTitle>Tambah Lokasi Berkas</DialogTitle>
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
              onClick={() => handleDialog("form")}
            >
              Tambah
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Fragment>
  );
}
