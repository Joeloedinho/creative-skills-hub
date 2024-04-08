import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthWrapper = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        padding: { xs: 1, sm: 2, md: 5 },
      }}
      className="auth-bg"
    >
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <Outlet />
    </Box>
  );
};

export default AuthWrapper;
