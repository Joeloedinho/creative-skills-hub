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
import {ReviewCard, useColors} from "../../../shared";
import {reviews} from "../../../temp/reviews";

// Dummy editor data
const editor = {
    id: "AKkajBJKHhjajJAHkh",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    dateJoined: "2022-01-15",
    level: "Beginner",
    years: 2,
    profilePhoto: "path-to-photo",
    appliedProjects: [
        {
            id: 1,
            title: "Introduction to Programming",
            imageUrl: "https://via.placeholder.com/150",
            status: "ongoing",
            client: "Mbah Lesky",
            level: "Intermediate",
        },
        {
            id: 2,
            title: "Advanced Web Development",
            imageUrl: "https://via.placeholder.com/150",
            status: "completed",
            client: "PT Indocyber",
            level: "Beginner",
        },
        {
            id: 3,
            title: "Data Structures and Algorithms",
            imageUrl: "https://via.placeholder.com/150",
            status: "completed",
            client: "Gojek",
            level: 'Beginner',
        },
        {
            id: 4,
            title: "Machine Learning Fundamentals",
            imageUrl: "https://via.placeholder.com/150",
            status: "ongoing",
            client: "Traveloka",
            level: 'Intermediate',
        },
        {
            id: 5,
            title: "Cybersecurity Essentials",
            imageUrl: "https://via.placeholder.com/150",
            status: "completed",
            client: "Bukalapak",
            level: "Beginner",
        }
    ],
};

const EditorsInfo = () => {
    const [level, setLevel] = useState(editor.level);
    const navigate = useNavigate();
    const colors = useColors();

    const handleLevelChange = (event) => {
        setLevel(event.target.value);
        // Here you can add the logic to update the editor's level in your database
    };

    const handleSaveChanges = () => {
        // Logic to save changes to the editor's information
        console.log("Updated level:", level);
    };

    return (
        <Container>
            <Paper sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Editor Details
                </Typography>
                <Box display="flex" alignItems="center" mb={3}>
                    <Avatar
                        src={editor.profilePhoto}
                        alt={editor.name}
                        sx={{ width: 150, height: 150, mr: 3 }}
                    />
                    <Box>
                        <Typography variant="h5">{editor.name}</Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="body1">{editor.email}</Typography>
                            <IconButton
                                aria-label="Email"
                                href={`mailto:${editor.email}`}
                                target="_blank"
                            >
                                <Email />
                            </IconButton>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Typography variant="body1">{editor.phone}</Typography>
                            <IconButton
                                aria-label="Call"
                                href={`tel:${editor.phone}`}
                                target="_blank"
                            >
                                <Phone />
                            </IconButton>
                        </Box>
                        <Typography variant="body1">
                            Date Joined: {editor.dateJoined}
                        </Typography>
                        <Typography variant="body1">
                            Years of Experience: {editor.years}
                        </Typography>
                        <Typography variant="body1">
                            Skill Level: {editor.level}
                        </Typography>
                        <Typography variant="body1">
                            No of Projects: 3
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box mt={3}>
                    <Typography variant="h5" gutterBottom>
                        Reviews
                    </Typography>
                    <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="space-around"
                        flexWrap="wrap"
                        sx={{ overflowX: "auto", overflowY: "visible", paddingY: 2 }}
                    >
                        {reviews.map((review, index) => (
                            <ReviewCard key={index} review={review} />
                        ))}
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};

export default EditorsInfo;
