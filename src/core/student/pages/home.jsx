import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Stack, TextField, Typography, Avatar } from "@mui/material";
import { happyMan } from "../../../assets";
import { CatergoryList, CourseGroup, ProjectGroup } from "../../../shared";
import { courses } from "../../../temp/courses";
import { projects } from "../../../temp/projects";
import axios from 'axios';

export default function StudentHomePage() {
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authToken = sessionStorage.getItem('authToken'); // Ensure this is managed securely

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:4000/students/reviews', {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setReviews(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, [authToken]);

  const handleSubmitReview = async () => {
    if (!review) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/students/submitReview', { review }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setReviews(prevReviews => [...prevReviews, response.data.review]);
      setReview('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: "100%", padding: 1 }}>
      <CatergoryList catergories={["Advanced", "Intermediate", "Beginner", "Top Rated"]} />
      <Box sx={{ width: "100%", maxWidth: 1200, padding: { xs: 1, sm: 2, md: 4 }, position: "relative", maxHeight: 800, marginX: "auto" }}>
        <Grid container>
          <Grid item xs={12} md={6} sx={{ paddingTop: 3 }}>
            <img src={happyMan} width="100%" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ height: "100%", padding: 3 }}>
              <Typography variant='h4' fontWeight='bold' textAlign='center'>
                Creative Skills Hub <br /> For Students
              </Typography>
              <Typography textAlign="center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
              <Button variant="contained" sx={{ width: "fit-content" }}>
                Continue Learning
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <CourseGroup title='Continue Learning' courses={courses} enrolledList={true} />
      <CatergoryList title='Learn by Software' catergories={["Software Catergories"]} />
      <CourseGroup title='Newly Added Courses' courses={courses} />
      <CourseGroup title='For Beginners' courses={courses} />
      <ProjectGroup title='Some Projects for Editors' projects={projects} />
      {/* Review Display Section */}
      <Box sx={{ padding: 3, maxWidth: 600, marginX: 'auto' }}>
  <Typography variant="h6" fontWeight='bold'>Student Reviews</Typography>
  {reviews.length > 0 ? (
  reviews.map((review, index) => (
    <Box key={index} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar src={review.profilePic} alt="Profile Pic" sx={{ width: 40, height: 40 }} />
        </Grid>
        <Grid item xs>
          <Typography variant="subtitle1">{review.email}</Typography>
          <Typography variant="body1">{review.review}</Typography>
          <Typography variant="caption" sx={{fontStyle: 'italic', color: 'blue' }}>{review.role}</Typography>
          <Typography variant="caption"sx={{marginLeft: 2}}>{new Date(review.dateTime).toLocaleString()}</Typography>
        </Grid>
      </Grid>
    </Box>
  ))
) : (
  <Typography paragraph>No reviews yet. Be the first to write one!</Typography>
)}
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
        <Button onClick={handleSubmitReview} disabled={loading} variant="contained">
          Submit Review
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Box>
  );
}
