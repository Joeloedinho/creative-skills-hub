import React from "react";
import {
  Paper, Typography, List,
  ListItem,
  ListItemText, ListItemButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CourseStudents = ({ course }) => {
  const navigate = useNavigate();
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Enrolled Students
      </Typography>
      <List>
        {course.enrolledStudents.map((student) => (
          <ListItem key={student.id}>
            <ListItemButton
              onClick={() => navigate(`/admin/student/${student.id}`)}
            >
              <ListItemText
                primary={student.name}
                secondary={`Enrolled on: ${student.dateEnrolled}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CourseStudents;
