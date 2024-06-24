import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Grid,
    Stack,
    TextField,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, LinearProgress, Rating
} from "@mui/material";
import { happyMan } from "../../../assets";
import {CatergoryList, ProjectGroup, ReviewCard, useColors} from "../../../shared";
import { projects } from "../../../temp/projects";
import { reviews as allReviews } from '../../../temp/reviews';
import {useNavigate} from "react-router-dom";

const editors = [
    {
        id: "1",
        name: "Alice Smith",
        email: "alice@example.com",
        phone: "123-456-7890",
        dateJoined: "2022-01-15",
        role: "Senior Editor",
        status: "Active",
        profilePhoto: "path-to-photo",
    },
    // Add more editor objects as needed
];

export default function ClientHomePage() {
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState(allReviews);
  const navigate = useNavigate();
  const colors = useColors();

  const handleSubmit = (e) => {
    const review = {
      profilePic: happyMan,
      review: e.target.value,
      dateTime: new Date().toLocaleString(),
      email: "happyman@gmail.com",
    };
    setReviews(prev => ([...prev, review]))
  }

  return (
      <Box sx={{ height: "100%", padding: {xs : 1, sm : 2, md : 3 }}}>
        <Grid container>
           <Grid item xs={12} sm={12} md={4} lg={3} sx={{
               height: '100vh',
               overflow: 'auto',
           }}>
               <Stack>
                   <Typography variant='h5' fontWeight='bold'>Editors</Typography>
                   <List sx={{padding: 2}}>
                       {[1,2,3,4,5,6,7,9,10].map((index) => {
                           const editor = editors[0];
                           return (<ListItem
                               key={editor.id}
                               onClick={() => navigate(`./editor/${editor.id}`)}
                               sx={{
                                   cursor: "pointer",
                                   "&:hover": { backgroundColor: colors.hoverColor },
                               }}
                           >
                               <ListItemAvatar>
                                   <Avatar
                                       variant="square"
                                       src={editor.profilePhoto || ""}
                                       alt={editor.name}
                                   />
                               </ListItemAvatar>
                               <ListItemText
                                   primary={editor.name}
                                   secondary={<Rating />}
                               />
                           </ListItem>)
                       })}
                   </List>
               </Stack>
           </Grid >
            <Grid item xs={12} sm={12} md={8} lg={9} sx={{
                height: '100vh',
                overflow: 'auto',
                padding: 2,
            }}>
                <Box>
                    <ProjectGroup role="client" title='Projects' fullWidth={true} projects={[...projects, ...projects, ...projects, projects[0]]} />
                    <Box sx={{ padding: 3, width: '100%', marginX: 'auto' }}>
                        <Typography variant="h6" fontWeight='bold'>Reviews</Typography>
                        <Stack direction='row' justifyContent={'center'} sx={{width: '100%', overflowX: 'auto'}}>
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <ReviewCard review={review} />
                                ))
                            ) : (
                                <Typography paragraph>No reviews yet. Be the first to write one!</Typography>
                            )}
                        </Stack>
                    </Box>
                    <Box sx={{ padding: 3, maxWidth: 600, marginX: 'auto' }}>
                        <Typography fontWeight='bold'>Write a Review About Our Platform</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            placeholder="Enter review..."
                            variant='outlined'
                            sx={{ marginBottom: 2 }}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                        <Button onClick={handleSubmit} disabled={loading} variant="contained">
                            Submit Review
                        </Button>
                        {error && <Typography color="error">{error}</Typography>}
                    </Box>
                </Box>
            </Grid>
        </Grid>
      </Box>
  );
}