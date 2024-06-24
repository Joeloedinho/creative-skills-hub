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
  Avatar,
  Box,
  Typography,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {useColors} from "../../../shared";

// Dummy editor data
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

const AllEditorsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const navigate = useNavigate();
  const colors = useColors();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterRoleChange = (event) => {
    setFilterRole(event.target.value);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredEditors = editors
    .filter((editor) => {
      return (
        editor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        editor.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter((editor) => {
      return filterRole ? editor.role === filterRole : true;
    });

  return (
    <Container>
      <Paper sx={{ padding: 2, margin: 2 }}>
        <Typography variant="h4" gutterBottom>
          All Editors
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
              value={filterRole}
              onChange={handleFilterRoleChange}
              displayEmpty
            >
              <MenuItem value="">All Roles</MenuItem>
              <MenuItem value="Senior Editor">Senior Editor</MenuItem>
              <MenuItem value="Junior Editor">Junior Editor</MenuItem>
              <MenuItem value="Contributor">Contributor</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Profile</TableCell>
                <TableCell>Date Joined</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEditors
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((editor) => (
                  <TableRow
                    key={editor.id}
                    onClick={() => navigate(`../editor/${editor.id}`)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: colors.hoverColor },
                    }}
                  >
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          src={editor.profilePhoto}
                          alt={editor.name}
                          sx={{ mr: 2 }}
                        />
                        <Box>
                          <Typography variant="body1">{editor.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {editor.email}
                            <br />
                            {editor.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{editor.dateJoined}</TableCell>
                    <TableCell>{editor.role}</TableCell>
                    <TableCell>{editor.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredEditors.length}
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

export default AllEditorsPage;
