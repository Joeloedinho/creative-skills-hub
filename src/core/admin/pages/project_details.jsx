import React from 'react';
import { Box, Typography, Grid, Chip, Divider, Paper, Container } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

const project = {
    dateAdded: 'Yesterday',
    title: 'Video Editing for Coffee Advert',
    info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium laborum, exercitationem numquam, aut, similique commodi ipsum mollitia enim vitae excepturi nemo! Repellendus tempore veritatis debitis porro animi quas modi hic excepturi quisquam repellat laboriosam culpa maiores voluptates dolor, vero earum veniam commodi deserunt cumque necessitatibus impedit pariatur cum minima. Sit dolorum autem ipsum minus, odio voluptates mollitia tempore? Ab similique ea architecto eaque harum et. Maiores, deleniti cumque. Nesciunt repellat perspiciatis, modi rem sit eligendi assumenda fugiat, dolore alias hic excepturi voluptatibus amet suscipit sunt vitae. Fuga expedita praesentium id, nesciunt accusamus illo itaque cum, fugiat hic aliquam sit, autem alias molestias dignissimos et obcaecati reprehenderit illum quo! Doloribus laudantium, aut dignissimos rem ipsum temporibus modi quidem quibusdam praesentium nobis? Corrupti dolorum atque quo quae numquam nulla a laboriosam sunt delectus',
    pay: '30000',
    payFrequency: 'hourly',
    timeline: '3 months',
    skills: 'intermediate',
    status: 'Open',
    client: 'MD Haggai',
    tags: ['Adobe Illustrator', 'Filmora'],
    attachment: "",
    submittedFile: "",
};

const ProjectDetailsPage = () => {
    const navigate = useNavigate();
    
  return (
    <Container>
        <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {project.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Added {project.dateAdded}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {project.info}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" gutterBottom>
              Pay
            </Typography>
            <Typography variant="body1">
              {project.pay} ({project.payFrequency})
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" gutterBottom>
              Timeline
            </Typography>
            <Typography variant="body1">{project.timeline}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" gutterBottom>
              Required Skills
            </Typography>
            <Typography variant="body1">{project.skills}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" gutterBottom>
              Status
            </Typography>
            <Typography variant="body1">{project.status}</Typography>
          </Grid>
          <Grid item xs={6} sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
                onClick={() => navigate(`/admin/client/${project.client}`)}
                >
            <Typography variant="subtitle2" gutterBottom>
              Client
            </Typography>
            <Typography variant="body1">{project.client}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" gutterBottom>
              Tags
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {project.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
    </Container>
  );
};

export default ProjectDetailsPage;