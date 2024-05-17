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
  Avatar,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Dummy project data
const projects = [
  {
    id: "1",
    title: "Website Redesign",
    description: "Complete overhaul of the company website.",
    dateCreated: "2023-01-20",
    level: "Intermediate",
    teamSize: 10,
    status: "In Progress",
    projectImage: "path-to-website-redesign-image.jpg", // Add image path
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Developing a mobile app for e-commerce platform.",
    dateCreated: "2022-09-10",
    level: "Advanced",
    teamSize: 15,
    status: "Completed",
    projectImage: "path-to-mobile-app-image.jpg", // Add image path
  },
  // Add more project objects as needed
  //...
];

const AllProjectsPage = () => {
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

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredProjects = projects
    .filter((project) => {
      return (
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter((project) => {
      return filterLevel ? project.level === filterLevel : true;
    });

  return (
    <Container>
      <Paper sx={{ padding: 2, margin: 2 }}>
        <Typography variant="h4" gutterBottom>
          All Projects
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
                <TableCell>Project Image</TableCell>
                <TableCell>Project Title</TableCell>
                <TableCell>Date Created</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Team Size</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((project) => (
                  <TableRow
                    key={project.id}
                    onClick={() => {
                      navigate(`../project/${project.id}`);
                    }}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <TableCell>
                      <Avatar
                        src={project.projectImage}
                        alt={project.title}
                        variant="rounded"
                        sx={{ width: 56, height: 56 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" flexDirection="column">
                        <Typography variant="body1" fontWeight="bold">
                          {project.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {project.description}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{project.dateCreated}</TableCell>
                    <TableCell>{project.level}</TableCell>
                    <TableCell>{project.teamSize}</TableCell>
                    <TableCell>{project.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredProjects.length}
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

export default AllProjectsPage;
