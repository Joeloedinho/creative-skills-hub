import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  Typography,
  Container,
  Grid,
  ListItem,
  ListItemText,
  Stack,
  Box,
  IconButton,
  Rating,
  Divider,
  List,
  ListItemIcon,
  ListItemButton,
  Tab,
  Tabs,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { PaymentModal, TabPanel, VideoPlayer, a11yProps } from "../../../shared";
import {
  Attachment,
  AttachmentRounded,
  Favorite,
  HorizontalRule,
  Pause,
  PlayArrow,
  TroubleshootOutlined,
} from "@mui/icons-material";
import SwipeableViews from "react-swipeable-views";

// Dummy course data
const course = {
  id: 1,
  title: "Introduction to Web Development",
  shortDescription: "Learn the basics of web development",
  level: "Beginner",
  dateUploaded: "March 25, 2024",
  duration: "4 weeks",
  price: "$49.99",
  longDescription:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sapiente impedit asperiores dolores commodi harum labore? Est beatae porro rem non maiores molestias, facere amet, dignissimos odit atque fugiat impedit?",
  lessons: [
    "Lesson 1: HTML Basics",
    "Lesson 2: CSS Styling",
    "Lesson 3: JavaScript Fundamentals",
  ],
};

const lessons = [
  {
    id: 1,
    title: "HTML Basics",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sapiente impedit asperiores dolores commodi harum labore? Est beatae porro rem non maiores molestias, facere amet, dignissimos odit atque fugiat impedit?",
    isPlaying: false,
    length: "2:30",
    attachmentUrl: "",
  },
  {
    id: 2,
    title: "CSS Styling",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sapiente impedit asperiores dolores commodi harum labore? Est beatae porro rem non maiores molestias, facere amet, dignissimos odit atque fugiat impedit?",
    isPlaying: false,
    length: "4:30",
    attachmentUrl: "",
  },
  {
    id: 3,
    title: "JavaScript Fundamentals",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sapiente impedit asperiores dolores commodi harum labore? Est beatae porro rem non maiores molestias, facere amet, dignissimos odit atque fugiat impedit?",
    isPlaying: false,
    length: "6:30",
    attachmentUrl: "klsklajs",
  },
  {
    id: 4,
    title: "Conclusion",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sapiente impedit asperiores dolores commodi harum labore? Est beatae porro rem non maiores molestias, facere amet, dignissimos odit atque fugiat impedit?",
    isPlaying: false,
    length: "1:30",
    attachmentUrl: "",
  },
];

const CoursePage = () => {
  // const { courseId } = useParams();
  // const course = courses.find((c) => c.id === parseInt(courseId));

  // if (!course) {
  //   return <Typography variant="h6">Course not found</Typography>;
  // }
  const [activeLesson, setActiveLesson] = useState(lessons[1]);
  const [tabValue, setTabValue] = useState(0);
  const [makePayment, setMakePayment] = useState(false);
  const theme = useTheme();

  const handleChange = (event, number) => {
    setTabValue(number);
  };

  const handleChangeIndex = (number) => {
    setTabValue(number);
  };

  return (
    <Container>
      <Card sx={{ mt: 4 }}>
        <Stack spacing={1} padding={2}>
          <ListItem>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {course.title}
              </Typography>
              <Rating />
              <IconButton>
                <Favorite fontSize="large" />
              </IconButton>
            </Stack>
          </ListItem>
          <VideoPlayer url={""} />
          <Box padding={2}>
            <Grid container>
              <Grid item xs={12} sm={10} md={4} lg={4}>
                <Typography color="primary" fontWeight="bold" fontSize={18}>
                  Prize: 12,000 FCFA
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ maxWidth: 300, marginBottom: 2 }}
                  onClick={() => setMakePayment(true)}
                >
                  Purchase
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ maxWidth: 300, marginBottom: 2 }}
                >
                  Add to Cart
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Tabs
                 value={tabValue}
                  onChange={handleChange}
                  variant="fullWidth"
                  sx={{ width: "100%" }}
                >
                  <Tab label="Overview" {...a11yProps(0)} />
                  <Tab label="Lessons" {...a11yProps(1)} />
                  <Tab
                    label="Resources"
                    {...a11yProps(2)}
                  />
                </Tabs>
                <SwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={tabValue}
                  onChangeIndex={handleChangeIndex}
                >
                  <TabPanel value={tabValue} index={0} dir={theme.direction}>
                    <Box padding={2}>
                      <Box>
                        <Typography variant="h5" fontWeight="bold">
                          About this course
                        </Typography>
                        <Typography>{course.shortDescription}</Typography>
                      </Box>
                      <HorizontalRule />
                      <Typography variant="h6" component="p" gutterBottom>
                        Level: {course.level}
                      </Typography>
                      <HorizontalRule />
                      <Typography variant="body2" component="p" gutterBottom>
                        Date Uploaded: {course.dateUploaded}
                      </Typography>
                      <HorizontalRule />
                      <Typography variant="body1" component="p" gutterBottom>
                        Duration: {course.duration}
                      </Typography>
                      <Divider />
                      <Box sx={{ border: "1px solid #ccc", padding: 2 }}>
                        <Typography variant="h5" fontWeight="bold">
                          Course Overview
                        </Typography>
                        <Box sx={{ padding: 2 }}>{course.longDescription}</Box>
                      </Box>
                    </Box>
                  </TabPanel>
                  <TabPanel value={tabValue} index={1} dir={theme.direction}>
                    <Box padding={2}>
                      <Stack direction='row' alignItems='center' spacing={1}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        component="p"
                        gutterBottom
                      >
                        Progress:
                      </Typography>
                      <Box flexGrow={1}>
                        <LinearProgress value={37} variant="buffer" sx={{height: 10}} />
                      </Box>
                      <Typography>
                        {37} %
                      </Typography>
                      </Stack>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        component="p"
                        gutterBottom
                        sx={{ mt: 4 }}
                      >
                        Lessons
                      </Typography>
                      <List>
                        {lessons.map((lesson, index) => (
                          <ListItem
                            key={lesson.id}
                            secondaryAction={
                              <Stack direction="row" alignItems="center">
                                {lesson.attachmentUrl !== "" ? (
                                  <IconButton
                                    onClick={() =>
                                      window.open(
                                        lesson.attachmentUrl,
                                        "_blank"
                                      )
                                    }
                                  >
                                    <AttachmentRounded />
                                  </IconButton>
                                ) : null}
                                <Typography>{lesson.length}</Typography>
                              </Stack>
                            }
                            disablePadding
                          >
                            <ListItemButton
                              onClick={() => setActiveLesson(lesson)}
                              selected={activeLesson === lesson}
                            >
                              <ListItemIcon>
                                {activeLesson === lesson ? (
                                  <Pause />
                                ) : (
                                  <PlayArrow />
                                )}
                              </ListItemIcon>
                              <ListItemText
                                primary={`${index + 1}. ${lesson.title}`}
                              />
                            </ListItemButton>
                            <Divider component="li" />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </TabPanel>
                  <TabPanel value={tabValue} index={2} dir={theme.direction}>
                    three
                  </TabPanel>
                </SwipeableViews>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Card>
      <PaymentModal isOpen={makePayment} handleClose={() => setMakePayment(false)} amount={12000} title="Purchase Intro to Web Development" />
    </Container>
  );
};

export default CoursePage;
