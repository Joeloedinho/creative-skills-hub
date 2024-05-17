import React, { useState } from 'react';
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
  Avatar,
  Box,
  Typography,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Dummy student data
const students = [
  {
    id: 'AKkajBJKHhjajJAHkh',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    dateJoined: '2022-01-15',
    level: 'Beginner',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    profilePhoto: 'path-to-photo',
  },
  {
    id: 'AKkajBJKHhjajJAHkh',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    dateJoined: '2022-01-15',
    level: 'Beginner',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    profilePhoto: 'path-to-photo',
  },
  {
    id: 'AKkajBJKHhjajJAHkh',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    dateJoined: '2022-01-15',
    level: 'Beginner',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    profilePhoto: 'path-to-photo',
  },
  {
    id: 'AKkajBJKHhjajJAHkh',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    dateJoined: '2022-01-15',
    level: 'Beginner',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    profilePhoto: 'path-to-photo',
  },
  {
    id: 'AKkajBJKHhjajJAHkh',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    dateJoined: '2022-01-15',
    level: 'Beginner',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    profilePhoto: 'path-to-photo',
  },
  {
    id: 'AKkajBJKHhjajJAHkh',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    dateJoined: '2022-01-15',
    level: 'Beginner',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    profilePhoto: 'path-to-photo',
  },
  {
    id: 'AKkajBJKHhjajJAHkh',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    dateJoined: '2022-01-15',
    level: 'Beginner',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    profilePhoto: 'path-to-photo',
  },
  {
    id: 'AKkajBJKHhjajJAHkh',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    dateJoined: '2022-01-15',
    level: 'Beginner',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    profilePhoto: 'path-to-photo',
  },
  {
    id: 'AKkajBJKHhjajJAHkh',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    dateJoined: '2022-01-15',
    level: 'Beginner',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    profilePhoto: 'path-to-photo',
  },
  {
    id: 'AKkajBJKHhjajJAHkh',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    dateJoined: '2022-01-15',
    level: 'Beginner',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    profilePhoto: 'path-to-photo',
  },
  {
    id: 'AKkajBJKHhjajJAHkh',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    dateJoined: '2022-01-15',
    level: 'Beginner',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    profilePhoto: 'path-to-photo',
  },
  {
    id: 'AKkajBJKHhjajJAHkh',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    dateJoined: '2022-01-15',
    level: 'Beginner',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    profilePhoto: 'path-to-photo',
  },
  // Add more student objects as needed
  //...
];

const AllStudentsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
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

  const filteredStudents = students
    .filter((student) => {
      return (
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter((student) => {
      return filterLevel ? student.level === filterLevel : true;
    });

  return (
    <Container>
      <Paper sx={{padding: 2, margin: 2}}>
      <Typography variant="h4" gutterBottom>
        All Students
      </Typography>
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
              <TableCell>Profile</TableCell>
              <TableCell>Date Joined</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Courses Enrolled</TableCell>
              <TableCell>Courses Completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student) => (
                <TableRow key={student.id} onClick={() => {navigate(`../student/${student.id}`)}} sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar src={student.profilePhoto} alt={student.name} sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="body1">{student.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {student.email}<br />{student.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{student.dateJoined}</TableCell>
                  <TableCell>{student.level}</TableCell>
                  <TableCell>{student.coursesEnrolled}</TableCell>
                  <TableCell>{student.coursesCompleted}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredStudents.length}
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

export default AllStudentsPage;
