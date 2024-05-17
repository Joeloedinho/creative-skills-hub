import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material";
import { TabPanel, a11yProps } from "../../../shared";
import SwipeableViews from "react-swipeable-views";
import CourseInfo from "../components/course_info";
import CourseStudents from "../components/course_students";
import CourseLessons from "../components/course_lessons";

// Dummy course data
const course = {
  id: "1",
  title: "Introduction to Web Development",
  shortDescription: "Learn the basics of web development",
  level: "Beginner",
  dateUploaded: "March 25, 2024",
  duration: "4 weeks",
  price: "$49.99",
  longDescription:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sapiente impedit asperiores dolores commodi harum labore? Est beatae porro rem non maiores molestias, facere amet, dignissimos odit atque fugiat impedit?",
  lessons: [
    { id: "lesson1", title: "HTML Basics", length: "2:30" },
    { id: "lesson2", title: "CSS Styling", length: "4:30" },
    { id: "lesson3", title: "JavaScript Fundamentals", length: "6:30" },
  ],
  image: "path-to-course-image",
  enrolledStudents: [
    { id: "student1", name: "John Doe", dateEnrolled: "2024-04-01" },
    { id: "student2", name: "Jane Smith", dateEnrolled: "2024-04-05" },
    { id: "student3", name: "Alice Johnson", dateEnrolled: "2024-04-07" },
  ],
};

const CourseDetailPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const handleChangeIndex = (number) => {
    setTabValue(number);
  };
  const handleChange = (_event, number) => {
    setTabValue(number);
  };

  return (
    <Container>
      <Paper sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
          Course Details
        </Typography>
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label="About Course" {...a11yProps(0)} />
          <Tab label="Lessons" {...a11yProps(1)} />
          <Tab label="Enrolled Students" {...a11yProps(2)} />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={tabValue}
          onChangeIndex={handleChangeIndex}
        >
          {/* First Panel */}
          <TabPanel value={tabValue} index={0}>
            <CourseInfo course={course} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <CourseLessons course={course} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <CourseStudents course={course} />
          </TabPanel>
        </SwipeableViews>
      </Paper>
    </Container>
  );
};

export default CourseDetailPage;
