import React, { useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  InputAdornment,
  Box,
  Typography,
  Select,
  MenuItem,
  Grid,
  Stack,
  Button,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { courseCardImg } from "../../../assets";

// Dummy course data
const courses = [
  {
    id: "1",
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript.",
    dateCreated: "2023-03-01",
    level: "Beginner",
    studentsEnrolled: 120,
    studentsCompleted: 85,
  },
  {
    id: "2",
    title: "Advanced React",
    description: "Deep dive into React.js and advanced concepts.",
    dateCreated: "2022-10-15",
    level: "Advanced",
    studentsEnrolled: 80,
    studentsCompleted: 60,
  },
  // Add more course objects as needed
  //...
];

const AllCoursesPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterLevelChange = (event) => {
    setFilterLevel(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredCourses = courses
    .filter((course) => {
      return (
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter((course) => {
      return filterLevel ? course.level === filterLevel : true;
    });

  return (
    <Container>
      <Paper sx={{ padding: 2, margin: 2 }}>
        <Stack direction="row" mb={2} justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            All Courses
          </Typography>
          <Button variant="contained" startIcon={<Add />}>
            Add Course
          </Button>
        </Stack>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              fullWidth
              value={filterLevel}
              onChange={handleFilterLevelChange}
              displayEmpty
            >
              <MenuItem value="">All Levels</MenuItem>
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Title</TableCell>
                <TableCell>Date Created</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Students Enrolled</TableCell>
                <TableCell>Students Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCourses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((course) => (
                  <TableRow
                    key={course.id}
                    onClick={() => {
                      navigate(`../course/${course.id}`);
                    }}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <TableCell>
                      <img src={courseCardImg} alt={course.title} />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" flexDirection="column">
                        <Typography variant="body1" fontWeight="bold">
                          {course.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {course.description}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{course.dateCreated}</TableCell>
                    <TableCell>{course.level}</TableCell>
                    <TableCell>{course.studentsEnrolled}</TableCell>
                    <TableCell>{course.studentsCompleted}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCourses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default AllCoursesPage;
