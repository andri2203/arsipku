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
  const [data, setData] = useState("");
  const [snackbar, setSnackbar] = useState("");
  const [dialog, setDialog] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [validate, setValidate] = useState("");

  return (
    <Card>
      <CardContent>Tab Penyimpanan</CardContent>
    </Card>
  );
}
