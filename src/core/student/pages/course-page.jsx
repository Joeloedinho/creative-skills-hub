import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Container,
  Grid,
  ListItem,
  ListItemText,
  Stack,
  Box,
  IconButton,
  Rating,
  Divider,
} from '@mui/material';
import { VideoPlayer } from '../../../shared';
import { Favorite, HorizontalRule } from '@mui/icons-material';

// Dummy course data
const course = {
    id: 1,
    title: 'Introduction to Web Development',
    shortDescription: 'Learn the basics of web development',
    level: 'Beginner',
    dateUploaded: 'March 25, 2024',
    duration: '4 weeks',
    price: '$49.99',
    longDescription: <div><h2>What You Will Learn</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at turpis nec lacus ullamcorper scelerisque.</p><ul><li>Introduction to React</li><li>Working with JSX</li><li>State Management</li><li>Building Components</li><li>Handling Events</li><li>Using Hooks</li></ul><h2>Requirements</h2><ul><li>Basic understanding of HTML, CSS, and JavaScript</li><li>Access to a computer with internet connection</li><li>Desire to learn and explore new concepts</li></ul></div>,
    lessons: ['Lesson 1: HTML Basics', 'Lesson 2: CSS Styling', 'Lesson 3: JavaScript Fundamentals'],
  };

const CoursePage = () => {
  // const { courseId } = useParams();
  // const course = courses.find((c) => c.id === parseInt(courseId));

  // if (!course) {
  //   return <Typography variant="h6">Course not found</Typography>;
  // }

  return (
    <Container>
      <Card sx={{ mt: 4 }}>
        <Stack spacing={1} padding={2}>
          <ListItem>
          <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'><Typography variant="h4" fontWeight='bold' gutterBottom>
            {course.title}
          </Typography>
          <Rating />
          <IconButton><Favorite fontSize='large'/></IconButton></Stack>
          </ListItem>
          <VideoPlayer url={''}/>
          <Box>
            <Typography variant='h5' fontWeight='bold'>About this course</Typography>
            <Typography>{course.shortDescription}</Typography>
          </Box>
          <HorizontalRule />
          <Typography variant="h6" component="p" gutterBottom>
            Level: {course.level}
          </Typography>
          <HorizontalRule />
          <Typography variant="body2" component="p" gutterBottom>
            Date Uploaded: {course.dateUploaded}
          </Typography>
          <HorizontalRule />
          <Typography variant="body1" component="p" gutterBottom>
            Duration: {course.duration}
          </Typography>
          <Divider />
          <Box sx={{border: '1px solid #ccc', padding: 2, }}>
            <Typography variant='h5' fontWeight='bold'>Course Overview</Typography>
            <Box sx={{padding: 2,}}>{course.longDescription}</Box>
          </Box>
          <Typography variant="body2" component="p" gutterBottom>
            Lessons:
          </Typography>
          <ul>
            {course.lessons.map((lesson, index) => (
              <li key={index}>{lesson}</li>
            ))}
          </ul>
        </Stack>
        <CardActions>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary">
                Purchase
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">
                Add to Cart
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="secondary">
                Add to Favorites
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Container>
  );
};

export default CoursePage;