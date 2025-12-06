import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Box,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Stack,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";

export default function UserTable({
  users,
  onAddUser,
  onEditUser,
  onToggleStatus,
}) {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((u) => {
    const term = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term) ||
      u.role?.toLowerCase().includes(term)
    );
  });

  const getInitials = (name) => (name ? name[0].toUpperCase() : "?");

  return (
    <Box sx={{ m: 3 }}>
      {/* --- CONTROL HEADER --- */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center" // Ensures vertical alignment
        mb={3}
      >
        {/* 1. SEARCH BAR */}
        <TextField
          placeholder="Search users by name and role..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            maxWidth: { xs: "100%", sm: 400 },
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              bgcolor: "#f3f4f6",
              borderRadius: 2,
              height: "45px",
              paddingRight: 0,
              "& fieldset": {
                borderColor: "#E2E8F0",
              },
              "&:hover fieldset": {
                borderColor: "#3C50E0",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3C50E0",
              },
            },
            "& input": {
              color: "#1e293b",
              fontWeight: 500,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: 1 }}>
                <SearchIcon sx={{ color: "text.secondary", fontSize: 22 }} />
              </InputAdornment>
            ),
          }}
        />

        {/* 2. ADD BUTTON */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddUser}
          sx={{
            height: "40px",
            fontWeight: 600,
            px: 3,
            textTransform: "none",
            whiteSpace: "nowrap",
            borderRadius: 2,
            bgcolor: "#3C50E0", // TailAdmin Blue
            boxShadow: "0px 4px 10px rgba(60, 80, 224, 0.24)",
            "&:hover": {
              bgcolor: "#3041B8",
            },
          }}
        >
          Add User
        </Button>
      </Stack>

      {/* --- TABLE CARD --- */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.03)", // Softer shadow
          border: "1px solid #EFF4FB", // Very subtle border
        }}
      >
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <TableContainer
            sx={{
              maxWidth: "100%",
              overflowX: "auto",
              "&::-webkit-scrollbar": { height: 8 },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#d1d5db",
                borderRadius: 4,
                "&:hover": { backgroundColor: "#9ca3af" },
              },
            }}
          >
            <Table sx={{ minWidth: 900 }} aria-label="user table">
              <TableHead sx={{ bgcolor: "#F7F9FC" }}>
                <TableRow>
                  <TableCell sx={{ py: 2.5, pl: 4, color: "#64748B" }}>
                    <strong>USER</strong>
                  </TableCell>
                  <TableCell sx={{ py: 2.5, color: "#64748B" }}>
                    <strong>ROLE</strong>
                  </TableCell>
                  <TableCell sx={{ py: 2.5, color: "#64748B" }}>
                    <strong>STATUS</strong>
                  </TableCell>
                  <TableCell
                    sx={{ py: 2.5, pr: 4, color: "#64748B" }}
                    align="right"
                  >
                    <strong>ACTIONS</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <TableRow
                      key={u.id}
                      hover
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{ py: 2, pl: 4 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: "#EFF4FB", // Light background for avatar
                              color: "#3C50E0", // Primary text for avatar
                              fontSize: "1rem",
                              fontWeight: "bold",
                            }}
                          >
                            {getInitials(u.name)}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              fontWeight={600}
                              sx={{
                                color: "#1e293b",
                                whiteSpace: "nowrap",
                                fontSize: "0.95rem",
                              }}
                            >
                              {u.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              {u.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={u.role}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontWeight: 600,
                            borderRadius: 1,
                            borderColor:
                              u.role === "ADMIN" ? "#3C50E0" : "#E2E8F0",
                            color: u.role === "ADMIN" ? "#3C50E0" : "#64748B",
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={u.status}
                          size="small"
                          sx={{
                            fontWeight: "bold",
                            borderRadius: 1,
                            bgcolor:
                              u.status === "ACTIVE"
                                ? "rgba(16, 185, 129, 0.1)" // Light Green
                                : "rgba(255, 0, 0, 0.1)", // Light Red
                            color:
                              u.status === "ACTIVE" ? "#10B981" : "#D34053",
                          }}
                        />
                      </TableCell>

                      <TableCell align="right" sx={{ pr: 4 }}>
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                          sx={{ minWidth: 100 }}
                        >
                          <Tooltip title="Edit User">
                            <IconButton
                              size="small"
                              sx={{
                                color: "#64748B",
                                "&:hover": { color: "#3C50E0" },
                              }}
                              onClick={() => onEditUser(u)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip
                            title={
                              u.status === "ACTIVE" ? "Deactivate" : "Activate"
                            }
                          >
                            <IconButton
                              size="small"
                              sx={{
                                color:
                                  u.status === "ACTIVE" ? "#D34053" : "#10B981",
                              }}
                              onClick={() => onToggleStatus(u)}
                            >
                              {u.status === "ACTIVE" ? (
                                <BlockIcon fontSize="small" />
                              ) : (
                                <CheckCircleIcon fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                      <Typography color="text.secondary" fontSize="1rem">
                        No users found matching "{search}"
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
