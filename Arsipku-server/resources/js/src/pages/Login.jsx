import { Box, Card, TextField, Button, IconButton } from "@mui/material";
import { useState } from "react";
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import API from "../utils/RestApi";

export default function Login(props) {
    const api = new API();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [obsecure, setObsecure] = useState(true);
    const { auth, setAuth } = useAuthContext();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    function handleLogin() {
        api.csrf().then(async function () {
            api.post("/login", { email: email, password }).then((user) => {
                setAuth(user.data.data);
                localStorage.setItem("user", JSON.stringify(user.data.data));
                localStorage.setItem("token", user.data.data.token);
                navigate(from, { replace: true });
            });
        });
    }

    return (
        <Box
            sx={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "var(--bs-gray-100)",
            }}
        >
            <Card
                sx={{
                    width: "400px",
                    padding: "0.75rem",
                }}
            >
                <p className="h3 mt-2 fw-bold text-center">ArsipApp</p>
                <p className="fst-italic text-center">Silahkan Login</p>
                <hr className="mx-4" />
                <Box sx={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                    <Box
                        sx={{ display: "flex", alignItems: "flex-end", mb: 1 }}
                    >
                        <Person
                            sx={{ color: "action.active", mr: 1, my: 0.5 }}
                        />
                        <TextField
                            id="email"
                            label="email"
                            variant="standard"
                            type="email"
                            autoFocus={true}
                            onChange={(ev) => {
                                setEmail(ev.target.value);
                            }}
                            fullWidth
                        />
                    </Box>
                    <Box
                        sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}
                    >
                        <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                        <TextField
                            id="password"
                            label="password"
                            variant="standard"
                            type={obsecure ? "password" : "text"}
                            onChange={(ev) => {
                                setPassword(ev.target.value);
                            }}
                            fullWidth
                        />
                        <IconButton
                            onClick={() => {
                                setObsecure(obsecure ? false : true);
                            }}
                        >
                            {obsecure ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button variant="outlined" onClick={handleLogin}>
                            Masuk
                        </Button>
                    </Box>
                </Box>
                <hr className="mx-4" />
                <p className="fst-italic text-center">
                    Copyright &copy; {new Date().getFullYear()}. All Right
                    Reserved
                </p>
            </Card>
        </Box>
    );
}
