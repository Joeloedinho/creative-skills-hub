import { Link, Navigate, Outlet } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  MobileStepper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material"
import { useContext, useEffect, useState } from "react";
import * as Assets from "../assets";
import {
  CourseGroup,
  Footer,
  FullTitleElement,
  LandingNavbar,
  ProjectGroup,
  ReviewCard,
} from "../shared";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { courses } from "../temp/courses";
import { projects } from "../temp/projects";
import { reviews } from "../temp/reviews";
import { useAuthContext } from "./auth/contexts/authContext";

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
  // const { courses, isFetchingCourses, coursesFetchError} = useFetch('url');
  // const { projects, isFetchingProjects, projectsFetchError } = useFetch('url');
  // const { catergories, isFetchingCaterogories, catergoriesFetchError} = useFetch('url');
  // const { reviews, isFetchingReviews, reviewsFetchError } = useFetch("url");
  const { userData, loading } = useAuthContext();
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = roles.length;

  console.log('Theme: ', theme);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep >= maxSteps - 1) {
      setActiveStep(0);
    }
  };

  // TODO: Automatic flow of roles

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep < 0) {
      setActiveStep(maxSteps - 1);
    }
  };

  // TODO: Sweapeble carousel

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

  if(loading) {
    return <div>Loading</div>
  }

  if(userData) {
    return <Navigate to={`/${userData.userType}`} replace={true} />
  } else {
  return (
    <Box sx={{
      backgroundColor: theme.palette.background.default
    }}>
      <LandingNavbar />
      {/* Body */}
      <Stack
      spacing={2}
      sx={{
        flexGrow: 1,
        width: "100%",
        marginX: "auto",
        overflow: "auto",
      }}
    >
      <Stack>
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
      </Stack>
      <Stack spacing={2} sx={{padding: 2}}>
        <Divider />
        <Typography variant="h5" color="primary" fontWeight="bold">
          COURSES
        </Typography>
        <CourseGroup title="For Beginners" courses={courses} />
        <Divider />
        <Typography variant="h5" color="primary" fontWeight="bold">
          PROJECTS
        </Typography>
        <ProjectGroup projects={projects} />
        <Divider />
        <Typography variant="h5" color="primary" fontWeight="bold">
          REVIEWS
        </Typography>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-around"
          flexWrap="wrap"
          sx={{ overflowX: "auto", overflowY: "visible", paddingY: 2 }}
        >
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </Stack>
      </Stack>
    </Stack>
    <Footer />
    </Box>
  );
};
}
export default LandingPage;
