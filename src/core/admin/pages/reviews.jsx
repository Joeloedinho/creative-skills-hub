import React, { useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  InputAdornment,
  Box,
  Typography,
  Select,
  MenuItem,
  Grid,
  Avatar,
  Rating,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Dummy review data
const reviews = [
  {
    id: "1",
    reviewerName: "Alice Smith",
    reviewerEmail: "alice@example.com",
    profilePhoto: "path-to-photo-1",
    reviewText: "Great course!",
    rating: 4,
    dateReviewed: "2022-02-10",
  },
  {
    id: "2",
    reviewerName: "Bob Johnson",
    reviewerEmail: "bob@example.com",
    profilePhoto: "path-to-photo-2",
    reviewText: "Very informative.",
    rating: 5,
    dateReviewed: "2021-06-24",
  },
  // Add more review objects as needed
];

const AllReviewsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredReviews = reviews
    .filter((review) => {
      return (
        review.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.reviewerEmail
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        review.reviewText.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter((review) => {
      return filterStatus ? review.status === filterStatus : true;
    });

  return (
    <Container>
      <Paper sx={{ padding: 2, margin: 2 }}>
        <Typography variant="h4" gutterBottom>
          All Reviews
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              fullWidth
              value={filterStatus}
              onChange={handleFilterStatusChange}
              displayEmpty
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="Published">Published</MenuItem>
              <MenuItem value="Unpublished">Unpublished</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reviewer</TableCell>
                <TableCell>Review</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Date Reviewed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReviews
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((review) => (
                  <TableRow
                    key={review.id}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          src={review.profilePhoto}
                          alt={review.reviewerName}
                          sx={{ mr: 2 }}
                        />
                        <Box>
                          <Typography variant="body1">
                            {review.reviewerName}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {review.reviewerEmail}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{review.reviewText}</TableCell>
                    <TableCell>
                      <Rating value={review.rating} readOnly />
                    </TableCell>
                    <TableCell>{review.dateReviewed}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredReviews.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default AllReviewsPage;
