import {
  Box, Paper,
  useTheme, Typography, Stack,
  Tab,
  Tabs
} from "@mui/material";
import { useState } from "react";
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import ProfileInfo from "./profile_info";

//TODO : Fix validation errors not displaying

const ProfilePage = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, number) => {
    setTabValue(number);
  };

  const handleChangeIndex = (number) => {
    setTabValue(number);
  };

  return (
    <Paper sx={{ padding: 3, height: "100%" }}>
      <Stack spacing={2}>
        <Typography variant='h4' fontWeight='900'>Profile and Settings</Typography>
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          variant="fullWidth"
          sx={{width: '100%'}}
        >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Transactions" {...a11yProps(1)} />
          <Tab label="Security" {...a11yProps(2)} />
        </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabValue}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={tabValue} index={0} dir={theme.direction}>
        <ProfileInfo />
        </TabPanel>
        <TabPanel value={tabValue} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={tabValue} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>
    </Box>
      </Stack>
    </Paper>
  );
};

function TabPanel({ children, value, index, ...other }) {

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default ProfilePage;