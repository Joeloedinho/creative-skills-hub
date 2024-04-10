import { Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import LandingNavbar from "./landing_navbar";

const LandingPage = () => {
  return (
    <>
      <LandingNavbar />
      <Link to="./auth/login">
        <Button>Go to Login</Button>
      </Link>
      <Outlet />
    </>
  );
};

export default LandingPage;
