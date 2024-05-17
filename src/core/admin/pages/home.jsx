import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { styled } from "@mui/system";
import {
  School, Build,
  Business,
  Edit, Reviews
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Dummy data for demonstration purposes
const stats = {
  totalStudents: 200,
  activeStudents: 180,
  totalEditors: 15,
  activeEditors: 12,
  totalClients: 50,
  activeClients: 45,
  totalCourses: 30,
  averageCourseRating: 4.5,
  totalProjects: 120,
  averageProjectRating: 4.7,
  reviews: 10,
};


const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.primary.light,
  cursor: "pointer",
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const AdminDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container>
      <Paper height="100%" sx={{ padding: 5 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard onClick={() => navigate("./students")}>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Total Students
                </Typography>
                <Typography variant="h2">{stats.totalStudents}</Typography>
                <Typography variant="body2">
                  Active: {stats.activeStudents}
                </Typography>
              </Box>
              <School fontSize="large" />
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard onClick={() => navigate("./editors")}>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Total Editors
                </Typography>
                <Typography variant="h2">{stats.totalEditors}</Typography>
                <Typography variant="body2">
                  Active: {stats.activeEditors}
                </Typography>
              </Box>
              <Edit fontSize="large" />
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard onClick={() => navigate("./clients")}>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Total Clients
                </Typography>
                <Typography variant="h2">{stats.totalClients}</Typography>
                <Typography variant="body2">
                  Active: {stats.activeClients}
                </Typography>
              </Box>
              <Business fontSize="large" />
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard onClick={() => navigate("./courses")}>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Total Courses
                </Typography>
                <Typography variant="h2">{stats.totalCourses}</Typography>
                <Typography variant="body2">
                  Avg. Rating: {stats.averageCourseRating}
                </Typography>
              </Box>
              <School fontSize="large" />
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard onClick={() => navigate("./projects")}>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Total Projects
                </Typography>
                <Typography variant="h2">{stats.totalProjects}</Typography>
                <Typography variant="body2">
                  Avg. Rating: {stats.averageProjectRating}
                </Typography>
              </Box>
              <Build fontSize="large" />
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard onClick={() => navigate("./reviews")}>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Total Reviews
                </Typography>
                <Typography variant="h2">{stats.reviews}</Typography>
                <Typography variant="body2">""</Typography>
              </Box>
              <Reviews fontSize="large" />
            </StatCard>
          </Grid>
          {/* <Grid item xs={12}>
          <Paper sx={{ padding: theme.spacing(3) }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Monthly Overview</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <Line type="monotone" dataKey="students" stroke="#8884d8" />
                <Line type="monotone" dataKey="editors" stroke="#82ca9d" />
                <Line type="monotone" dataKey="clients" stroke="#ffc658" />
                <Line type="monotone" dataKey="courses" stroke="#ff7300" />
                <Line type="monotone" dataKey="projects" stroke="#387908" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid> */}
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
