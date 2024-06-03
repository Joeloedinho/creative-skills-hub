import {
    Box,
    Container,
    Grid,
    IconButton,
    MenuItem,
    Pagination,
    PaginationItem,
    Paper,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { ProjectCard } from "../../../shared";
  import { projects } from "../../../temp/projects";
  import { Search } from "@mui/icons-material";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
  
  const projectFilters = [
    {
      name: "All",
      value: "all",
    },
    {
      name: "Completed",
      value: "completed",
    },
    {
      name: "Uncompleted",
      value: "Completed",
    },
    {
      name: "Beginner",
      value: "beginner",
    },
    {
      name: "Intermediate",
      value: "intermediate",
    },
  ];
  
  function AcceptedProjects() {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const pageCourseCount = 20;
    const pageCount = Math.ceil(projects.length / pageCourseCount);
    return (
      <Container maxWidth="xl" sx={{ margin: "10px auto" }}>
        <Paper elevation={10} sx={{ height: "100%", width: "100%", padding: 1 }}>
          <Stack spacing={2} alignItems='center'>
            <Typography variant="h5" fontWeight="bold">
              Enrolled Courses
            </Typography>
            <Grid container>
              <Grid item xs={10} sm={6} md={6} lg={6}>
                <TextField
                  id="filter-courses"
                  select
                  label="Filter Courses"
                  variant="standard"
                  defaultValue="all"
                  fullWidth
                  sx={{ maxWidth: 300 }}
                >
                  {projectFilters.map((filter) => (
                    <MenuItem key={filter.value} value={filter.value}>
                      {filter.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={10} sm={6} md={6} lg={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    width: "100%",
                    maxWidth: 300,
                  }}
                >
                  <IconButton>
                    <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  </IconButton>
                  <TextField
                    id="input-with-sx"
                    label="With sx"
                    variant="standard"
                    placeholder="Search projects..."
                    sx={{ flexGrow: 1 }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Stack
              flexWrap="wrap"
              direction="row"
              justifyContent="center"
              sx={{ marginTop: 3 }}
            >
              {projects.slice((page - 1) * pageCourseCount, page * pageCourseCount).map((project, index) => (
                <ProjectCard key={index} project={project} onClick={() => navigate(`/editor/projects/${project.id}`)}/>
              ))}
            </Stack>
            <Pagination count={pageCount} page={page} onChange={(event, value) => setPage(value)} />
          </Stack>
        </Paper>
      </Container>
    );
  }
  
  export default AcceptedProjects;
  