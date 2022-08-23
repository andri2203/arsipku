import { Box, Card } from "@mui/material";

export default function Login(props) {
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
          height: "85vh",
          padding: "0.75rem",
        }}
      >
        Login
      </Card>
    </Box>
  );
}
