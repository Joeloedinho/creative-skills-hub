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
import {AddProjectPage} from "../index";
import PaymentPage from "./payment_page";

const NewProject = () => {
    const [projectData, setProjectData] = useState({
        title: '',
        skills: [],
        level: 'Beginner',
        installments: 1,
        briefingFile: null,
        duration: 1,
        durationLength: '',
        overview: '',
        price: 0,
        dateUploaded: null,

    });
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(1);
    const handleChangeIndex = (number) => {
        setTabValue(number);
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
                        <AddProjectPage onDone={() => handleChangeIndex(1)} data={projectData} setData={setProjectData} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <PaymentPage data={projectData} setData={setProjectData} goBack={() => handleChangeIndex(0)}/>
                    </TabPanel>
                </SwipeableViews>
            </Paper>
        </Container>
    );
};

export default NewProject;
