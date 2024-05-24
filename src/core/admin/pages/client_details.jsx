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
  Chip,
  Stack,
} from "@mui/material";
import { courseCardImg } from "../../../assets";
import { Email, Phone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Dummy client data
const client = {
  id: "AKkajBJKHhjajJAHkh",
  name: "John Doe",
  email: "john@example.com",
  website: "www.facebook.com",
  phone: "123-456-7890",
  dateJoined: "2022-01-15",
  isIndividual: true,
  years: 2,
  profilePhoto: "path-to-photo",
  projects: [
    {
      id: 1,
      title: "Introduction to Programming",
      imageUrl: "https://via.placeholder.com/150",
      status: "ongoing",
      editor: "Mbah Lesky",
      level: "Intermediate",
    },
    {
      id: 2,
      title: "Advanced Web Development",
      imageUrl: "https://via.placeholder.com/150",
      status: "completed",
      editor: "PT Indocyber",
      level: "Beginner",
    },
    {
      id: 3,
      title: "Data Structures and Algorithms",
      imageUrl: "https://via.placeholder.com/150",
      status: "completed",
      editor: "Gojek",
      level: 'Beginner',
    },
    {
      id: 4,
      title: "Machine Learning Fundamentals",
      imageUrl: "https://via.placeholder.com/150",
      status: "ongoing",
      editor: "Traveloka",
      level: 'Intermediate',
    },
    {
      id: 5,
      title: "Cybersecurity Essentials",
      imageUrl: "https://via.placeholder.com/150",
      status: "completed",
      editor: "Bukalapak",
      level: "Beginner",
    }
  ],
};

const ClientDetailsPage = () => {
  const [level, setLevel] = useState(client.level);
  const navigate = useNavigate();

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
    // Here you can add the logic to update the client's level in your database
  };

  const handleSaveChanges = () => {
    // Logic to save changes to the client's information
    console.log("Updated level:", level);
  };

  return (
    <Container>
      <Paper sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
          Client Details
        </Typography>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            src={client.profilePhoto}
            alt={client.name}
            sx={{ width: 150, height: 150, mr: 3 }}
          />
          <Box>
            <Typography variant="h5">{client.name}</Typography>
            <Typography variant="h6">
              {client.isIndividual ? "Individual" : "Organisation"}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body1">{client.email}</Typography>
              <IconButton
                aria-label="Email"
                href={`mailto:${client.email}`}
                target="_blank"
              >
                <Email />
              </IconButton>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body1">{client.phone}</Typography>
              <IconButton
                aria-label="Call"
                href={`tel:${client.phone}`}
                target="_blank"
              >
                <Phone />
              </IconButton>
            </Box>
            <Typography variant="body1">
              Date Joined: {client.dateJoined}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box mt={3}>
          <Typography variant="h5" gutterBottom>
            Projects
          </Typography>
          <List>
            {client.projects.map((project) => (
              <ListItem
                key={project.id}
                onClick={() => navigate(`/admin/project/${project.id}`)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <ListItemText
                  primary={project.title}
                  sx={{"&:hover": { backgroundColor: "#d3d3d3"}}}
                  onClick={() => navigate(`/admin/editor/${project.editor}`)}
                  secondary={`Editor: ${project.editor}`}
                />
                <Box width="50%">
                  <Typography>Status</Typography>
                  <Chip sx={{backgroundColor: project.status == "completed" ? "green" : "lightgray"}} label={project.status} />
                </Box>
                <Typography>{project.level}</Typography>

              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default ClientDetailsPage;
