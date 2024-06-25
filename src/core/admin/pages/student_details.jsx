import React, { useState, useEffect } from "react";
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
import { Email, Phone } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useAdmin } from "../contexts/adminContext";
import {useColors} from "../../../shared";

const StudentDetailsPage = () => {
  const { studentID } = useParams();
  const { fetchStudentById } = useAdmin();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const colors = useColors();

  useEffect(() => {
    const fetchStudentDetails = () => {
      const student = fetchStudentById(studentID);
      if (student) {
        setStudent(student);
      } else {
        setStudent(null);
      }
      setLoading(false);
    };
    fetchStudentDetails();
  }, [studentID, fetchStudentById]);

  const handleLevelChange = (event) => {
    setStudent((prevState) => ({
      ...prevState,
      level: event.target.value,
    }));
  };

  const handleSaveChanges = () => {
    
    console.log("Updated level:", student.level);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!student) {
    return <Typography>Student not found</Typography>;
  }

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
                value={student.level || ""}
                onChange={handleLevelChange}
                displayEmpty
                fullWidth
                variant="outlined"
              >
                <MenuItem value="">Select Level</MenuItem>
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
          {student.enrolledCourses && student.enrolledCourses.length > 0 ? (
            <List>
              {student.enrolledCourses.map((course) => (
                <ListItem
                  key={course.id}
                  onClick={() => navigate(`/admin/course/${course.id}`)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: colors.hoverColor },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={course.imageUrl || ""}
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
          ) : (
            <Typography>No enrolled courses</Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default StudentDetailsPage;
