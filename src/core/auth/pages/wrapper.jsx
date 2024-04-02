import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthWrapper = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        padding: 5,
      }}
      className="auth-bg"
    >
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <Outlet />
    </Box>
  );
};

export default AuthWrapper;
