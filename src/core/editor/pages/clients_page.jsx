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
import { clients } from "../../../temp/clients";
import { Search } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ClientCard from "../components/client_card";
import { useNavigate } from "react-router-dom";

function AllClients() {
  const [page, setPage] = useState(1);
  const pageCourseCount = 20;
  const pageCount = Math.ceil(clients.length / pageCourseCount);

  const navigate = useNavigate();
  return (
    <Container maxWidth="xl" sx={{ margin: "10px auto" }}>
      <Paper elevation={10} sx={{ height: "100%", width: "100%", padding: 1 }}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Creative Skills Hub Clients
          </Typography>
          <Grid container>
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
                  variant="standard"
                  placeholder="Search clients..."
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
            {clients
              .slice((page - 1) * pageCourseCount, page * pageCourseCount)
              .map((client, index) => (
                <ClientCard
                  key={index}
                  client={client}
                  onClick={() => navigate(`/editor/client/${client.id}`)}
                />
              ))}
          </Stack>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </Stack>
      </Paper>
    </Container>
  );
}

export default AllClients;
