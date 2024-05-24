import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useAlert } from "../../../hooks";
import MUIRichTextEditor from "mui-rte";
import SwipeableViews from "react-swipeable-views";
import { TabPanel } from "../../../shared";
import NewCourseInfo from "../components/new_course_info";
import LessonList from "../components/add_course_lesson";
import PriceForm from "../components/upload_course";

const NewCourse = () => {
 const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    categories: [],
    level: 'Beginner',
    duration: '',
    imageFile: null,
    overview: '',
    price: '',
    lessons: []
 
 });
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const handleChangeIndex = (number) => {
    setTabValue(number);
    console.log('Data', courseData)
  };
  const handleChange = (_event, number) => {
    setTabValue(number);
  };

  const handleSubmit = () => {

  }

  return (
    <Container>
      <Paper sx={{padding: 2, margin: 2}}>
      {/* <Tabs value={tabValue} onChange={handleChange}>
          <Tab label="About Course" {...a11yProps(0)} />
          <Tab label="Lessons" {...a11yProps(1)} />
          <Tab label="Enrolled Students" {...a11yProps(2)} />
        </Tabs> */}
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={tabValue}
          onChangeIndex={handleChangeIndex}
        >
          {/* First Panel */}
          <TabPanel value={tabValue} index={0}>
            <NewCourseInfo onDone={() => handleChangeIndex(1)} setData={setCourseData} data={courseData} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <LessonList goBack={() => handleChangeIndex(0)} onDone={() => handleChangeIndex(2)} setData={setCourseData} data={courseData} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <PriceForm data={courseData} setData={setCourseData} goBack={() => handleChangeIndex(1)}/>
          </TabPanel>
        </SwipeableViews>
      </Paper>
    </Container>
  );
};

export default NewCourse;
