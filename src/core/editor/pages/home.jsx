import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Stack, TextField, Typography, Avatar } from "@mui/material";
import { happyMan } from "../../../assets";
import { CatergoryList, ProjectGroup, ReviewCard } from "../../../shared";
import { projects } from "../../../temp/projects";
import { reviews as allReviews } from '../../../temp/reviews';
import { clients } from '../../../temp/clients';
import ClientGroup from '../components/client_group';

export default function EditorHomePage() {
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState(allReviews);

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
    <Box sx={{ height: "100%", padding: 1 }}>
      <Box sx={{ width: "100%", maxWidth: 1200, padding: { xs: 1, sm: 2, md: 4 }, position: "relative", maxHeight: 800, marginX: "auto" }}>
        <Grid container>
          <Grid item xs={12} md={6} sx={{ paddingTop: 3 }}>
            <img src={happyMan} width="100%" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ height: "100%", padding: 3 }}>
              <Typography variant='h4' fontWeight='bold' textAlign='center'>
                Creative Skills Hub <br /> For Editors
              </Typography>
              <Typography textAlign="center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
              <Button variant="contained" sx={{ width: "fit-content" }}>
                Continue Working
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <CatergoryList catergories={["Advanced", "Intermediate", "Beginner", "Top Rated"]} />
      <ProjectGroup role="editor" title='Some Projects for Editors' projects={[...projects, ...projects, ...projects, projects[0]]} />
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
  );
}