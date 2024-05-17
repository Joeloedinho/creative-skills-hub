import React from "react";
import {
  Paper,
  Box,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";

const CourseInfo = ({ course }) => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="center" mb={2}>
        <Avatar
          variant="square"
          src={course.image}
          alt={course.title}
          sx={{ width: 150, height: 150 }}
        />
      </Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {course.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {course.shortDescription}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Level: {course.level}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Date Uploaded: {course.dateUploaded}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Price: {course.price}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" gutterBottom>
        Course Overview
      </Typography>
      <Typography variant="body2">{course.longDescription}</Typography>
    </Paper>
  );
};

export default CourseInfo;
