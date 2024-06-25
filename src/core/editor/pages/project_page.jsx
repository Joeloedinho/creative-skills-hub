import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Divider,
  Paper,
  Container,
  Stack,
  Avatar,
  Button,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useAlert } from "../../../hooks";
import { primaryLogo } from "../../../assets";
import {useColors} from "../../../shared";

const project = {
  dateAdded: "Yesterday",
  title: "Video Editing for Coffee Advert",
  info: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium laborum, exercitationem numquam, aut, similique commodi ipsum mollitia enim vitae excepturi nemo! Repellendus tempore veritatis debitis porro animi quas modi hic excepturi quisquam repellat laboriosam culpa maiores voluptates dolor, vero earum veniam commodi deserunt cumque necessitatibus impedit pariatur cum minima. Sit dolorum autem ipsum minus, odio voluptates mollitia tempore? Ab similique ea architecto eaque harum et. Maiores, deleniti cumque. Nesciunt repellat perspiciatis, modi rem sit eligendi assumenda fugiat, dolore alias hic excepturi voluptatibus amet suscipit sunt vitae. Fuga expedita praesentium id, nesciunt accusamus illo itaque cum, fugiat hic aliquam sit, autem alias molestias dignissimos et obcaecati reprehenderit illum quo! Doloribus laudantium, aut dignissimos rem ipsum temporibus modi quidem quibusdam praesentium nobis? Corrupti dolorum atque quo quae numquam nulla a laboriosam sunt delectus",
  pay: "30000",
  payFrequency: "hourly",
  timeline: "3 months",
  skills: "intermediate",
  status: "Open",
  client: "MD Haggai",
  tags: ["Adobe Illustrator", "Filmora"],
  attachment: "",
  submittedFile: "",
};

const EditorsProjectPage = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const colors = useColors();
  const [state, setState] = useState({
    status: "Open",
    btnStatus: "Apply Now",
    accepted: false,
  });
  const client = {
    id: "kjakldjskd",
    name: "Mbah Lesky",
  };

  const apply = () => {
    setState((prev) => ({ ...prev, btnStatus: "Cancel Application" }));
    acceptApplication();
  };

  const cancelApplication = () => {
    setState((prev) => ({ ...prev, btnStatus: "Apply Now" }));
  };

  const acceptApplication = () => {
    setTimeout(() => {
      setState((prev) => ({ ...prev, status: "Closed", accepted: true }));
    }, [3000]);
  };

  return (
    <Container>
      <Box sx={{ p: {xs: 0, sx: 1, md: 2, lg: 4} }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Stack
            direction="row"
            my={2}
            spacing={2}
            alignItems="center"
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: colors.hoverColor },
            }}
            onClick={() => navigate(`/editor/clients/${client.id}`)}
          >
            <Avatar src={""} sx={{ width: "75px", height: "75px" }} />
            <Stack>
              <Typography variant="h6" fontWeight="bold">
                {client.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Added {project.dateAdded}
              </Typography>
            </Stack>
          </Stack>
          <Typography variant="h4" gutterBottom>
            {project.title}
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
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="subtitle2" gutterBottom>
                  Status
                </Typography>
                <Chip
                  variant="outlined"
                  label={state.status}
                  color={state.status == "Open" ? "success" : "error"}
                />
              </Stack>
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
            <Grid item xs={12}>
            {state.accepted && (<a href={primaryLogo}>Project Briefing</a>)}
              {state.accepted && (<Button>Submit Project</Button>)}
              {!state.accepted && (
                <Button
                  color={state.btnStatus == "Apply Now" ? "primary" : "error"}
                  variant="contained"
                  onClick={
                    state.btnStatus == "Apply Now" ? apply : cancelApplication
                  }
                >
                  {state.btnStatus}
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default EditorsProjectPage;
