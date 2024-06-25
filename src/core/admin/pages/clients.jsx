import React, { useState } from 'react';
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
  Avatar
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {useColors} from "../../../shared";

// Dummy client data
const clients = [
  {
    id: '1',
    name: 'Alice Smith',
    email: 'alice@example.com',
    phone: '123-456-7890',
    dateJoined: '2022-02-10',
    status: 'Active',
    profilePhoto: 'path-to-photo-1',
  },
  {
    id: '2',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '234-567-8901',
    dateJoined: '2021-06-24',
    status: 'Inactive',
    profilePhoto: 'path-to-photo-2',
  },
  // Add more client objects as needed
];

const AllClientsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();
  const colors = useColors();

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

  const filteredClients = clients
    .filter((client) => {
      return (
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter((client) => {
      return filterStatus ? client.status === filterStatus : true;
    });

  return (
    <Container>
      <Paper sx={{ padding: 2, margin: 2 }}>
        <Typography variant="h4" gutterBottom>
          All Clients
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
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Profile</TableCell>
                <TableCell>Date Joined</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((client) => (
                  <TableRow key={client.id} onClick={() => navigate(`../client/${client.id}`)} sx={{ cursor: 'pointer', '&:hover': { backgroundColor: colors.hoverColor } }}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar src={client.profilePhoto} alt={client.name} sx={{ mr: 2 }} />
                        <Box>
                          <Typography variant="body1">{client.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {client.email}<br />{client.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{client.dateJoined}</TableCell>
                    <TableCell>{client.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredClients.length}
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

export default AllClientsPage;
