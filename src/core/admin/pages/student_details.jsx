import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Avatar,
  MenuItem,
  Select,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Divider,
  Button,
  ListItemAvatar,
  IconButton,
} from "@mui/material";
import { courseCardImg } from "../../../assets";
import { Email, Phone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Dummy student data
const student = {
  id: "AKkajBJKHhjajJAHkh",
  name: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  dateJoined: "2022-01-15",
  level: "Beginner",
  profilePhoto: "path-to-photo",
  enrolledCourses: [
    {
      id: 1,
      title: "Introduction to Programming",
      imageUrl: "https://via.placeholder.com/150",
      enrolledDate: "2023-03-15",
      progress: 80,
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      imageUrl: "https://via.placeholder.com/150",
      enrolledDate: "2023-04-01",
      progress: 60,
    },
    {
      id: 3,
      title: "Web Development Fundamentals",
      imageUrl: "https://via.placeholder.com/150",
      enrolledDate: "2023-02-20",
      progress: 90,
    },
    {
      id: 4,
      title: "Machine Learning with Python",
      imageUrl: "https://via.placeholder.com/150",
      enrolledDate: "2023-05-10",
      progress: 35,
    },
    {
      id: 5,
      title: "Cybersecurity Essentials",
      imageUrl: "https://via.placeholder.com/150",
      enrolledDate: "2023-04-25",
      progress: 70,
    },
  ],
};

const StudentDetailsPage = () => {
  const [level, setLevel] = useState(student.level);
  const navigate = useNavigate();

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
    // Here you can add the logic to update the student's level in your database
  };

  const handleSaveChanges = () => {
    // Logic to save changes to the student's information
    console.log("Updated level:", level);
  };

  return (
    <Container>
      <Paper sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
          Student Details
        </Typography>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            src={student.profilePhoto}
            alt={student.name}
            sx={{ width: 150, height: 150, mr: 3 }}
          />
          <Box>
            <Typography variant="h5">{student.name}</Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body1">{student.email}</Typography>
              <IconButton
                aria-label="Email"
                href={`mailto:${student.email}`}
                target="_blank"
              >
                <Email />
              </IconButton>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body1">{student.phone}</Typography>
              <IconButton
                aria-label="Call"
                href={`tel:${student.phone}`}
                target="_blank"
              >
                <Phone />
              </IconButton>
            </Box>
            <Typography variant="body1">
              Date Joined: {student.dateJoined}
            </Typography>
            <Box mt={2}>
              <Select
                value={level}
                onChange={handleLevelChange}
                displayEmpty
                fullWidth
                variant="outlined"
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box mt={3}>
          <Typography variant="h5" gutterBottom>
            Enrolled Courses
          </Typography>
          <List>
            {student.enrolledCourses.map((course) => (
              <ListItem
                key={course.id}
                onClick={() => navigate(`/admin/course/${course.id}`)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={courseCardImg}
                    alt={course.title}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={course.title}
                  secondary={`Enrolled on: ${course.enrolledDate}`}
                />
                <Box width="50%">
                  <LinearProgress
                    variant="determinate"
                    value={course.progress}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {course.progress}%
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default StudentDetailsPage;
