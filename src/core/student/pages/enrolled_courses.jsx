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
import { EnrolledCourseCard } from "../../../shared";
import { courses } from "../../../temp/courses";
import { Search } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const courseFilters = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Completed",
    value: "completed",
  },
  {
    name: "In Progress",
    value: "in-progress",
  },
  {
    name: "Not Started",
    value: "not-started",
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

function EnrolledCourses() {
  const [page, setPage] = useState(1);
  const pageCourseCount = 20;
  const pageCount = Math.ceil(courses.length / pageCourseCount);
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
                id="filter-countries"
                select
                label="Filter Courses"
                variant="standard"
                defaultValue="all"
                fullWidth
                sx={{ maxWidth: 300 }}
              >
                {courseFilters.map((filter) => (
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
                  placeholder="Search courses..."
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
            {courses.slice((page - 1) * pageCourseCount, page * pageCourseCount).map((course, index) => (
              <EnrolledCourseCard key={index} course={course} />
            ))}
          </Stack>
          <Pagination count={pageCount} page={page} onChange={(event, value) => setPage(value)} />
        </Stack>
      </Paper>
    </Container>
  );
}

export default EnrolledCourses;
