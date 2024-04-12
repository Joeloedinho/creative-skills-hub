import { Link, Outlet } from "react-router-dom";
import { Box, Button, Divider, MobileStepper, Stack, Typography } from "@mui/material";
import LandingNavbar from "./landing_navbar";
import { useEffect, useState } from "react";
import * as Assets from "../../assets";
import { CourseGroup, FullTitleElement } from "../../shared";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { courses } from '../../temp/courses';

const roles = [
  {
    name: "Students",
    img: Assets.studentWorkspace,
    path: "/auth/register/student",
    action: "Become a Student",
    info: "Dive into the world of video editing and unlock your creative potential with CreativeSkillsHub! Become a student and start exploring our platform and learning new skills.",
    alignTo: "start",
  },
  {
    name: "Editors",
    img: Assets.editorWorkspace,
    path: "/auth/register/editor",
    action: "Become an Editor",
    info: "Are you ready to showcase your skills, expand your portfolio, and take your editing career to new heights? Look no further than CreativeSkillsHub – your ultimate platform for connecting with top-notch projects and clients.",
    alignTo: "end",
  },
  {
    name: "Business",
    img: Assets.clientWorkspace,
    path: "/auth/register/client",
    action: "Start Finding Editors",
    info: "Are you searching for skilled professionals to bring your creative vision to life? Look no further than CreativeSkillsHub – your one-stop destination for finding talented editors and collaborating on stunning projects.",
    alignTo: "center",
  },
];

const LandingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = roles.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep >= maxSteps - 1) {
      setActiveStep(0);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep < 0) {
      setActiveStep(maxSteps - 1);
    }
  };

  const carousel = roles.map((role) => (
    <Stack
      key={role.name}
      justifyContent="space-evenly"
      spacing={2}
      sx={{
        height: 400,
        width: "100%",
        overflow: "hidden",
        backgroundImage: `url(${role.img})`,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: 3,
        color: "white",
      }}
    >
      <Stack direction="row" alignItems={"end"} spacing={1}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Creative Skills Hub,
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          <i>Who is it for?</i>
        </Typography>
      </Stack>
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, alignSelf: role.alignTo }}
      >
        For {role.name}
      </Typography>
      <Box sx={{ maxWidth: 400, alignSelf: role.alignTo }}>
        <Typography
          variant="body"
          sx={{ color: "white", fontSize: { xs: 18, md: 22 } }}
        >
          {role.info}
        </Typography>
      </Box>
      <Link to={role.path} style={{ alignSelf: role.alignTo }}>
        <Button variant="contained">{role.action}</Button>
      </Link>
    </Stack>
  ));

  return (
    <Stack spacing={2} sx={{width: {xs: '100%', md: '95%', lg: '90%'}, marginX: 'auto', maxWidth: 1500, overflow: 'auto',}}>
      {/* <Stack>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          padding: { xs: 1, sm: 2, md: 4 },
          position: "relative",
          maxHeight: 800,
          marginX: "auto",
        }}
      >
        {carousel[activeStep]}
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext}>
              Next <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack}>
              Prev <KeyboardArrowLeft />
            </Button>
          }
        />
      </Box>
      </Stack> */}
      <Divider />
      <Stack>
          <CourseGroup title="For Beginners" courses={courses} />
      </Stack>
    </Stack>
  );
};

export default LandingPage;
