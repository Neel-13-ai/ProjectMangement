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
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Stack,
  Avatar,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckIcon from "@mui/icons-material/Check";
import { useAuth } from "../context/authContext";

export default function ProjectTable({
  projects,
  onAddProject,
  onEditProject,
  onStatusChange,
}) {
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";
  const isTester = user?.role === "TESTER";
  const isDeveloper = user?.role === "DEVELOPER";

  const showAddButton = isAdmin || isTester;
  const showAssignedTo = isAdmin || isTester;
  const showCreatedBy = isAdmin || isDeveloper;
  const showDeveloperColumn = isDeveloper;

  const filtered = projects.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.status.toLowerCase().includes(term)
    );
  });

  const getInitials = (name) => (name ? name[0].toUpperCase() : "?");

  return (
    <Box sx={{ m: 3 }}>
      {/* HEADER */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <TextField
          placeholder="Search projects..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 400, flexGrow: 1 }}
        />

        {/* Add Project Button */}
        {showAddButton && (
          <button
            onClick={onAddProject}
            style={{
              padding: "10px 20px",
              background: "#3C50E0",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            + Add Project
          </button>
        )}
      </Stack>

      {/* TABLE */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead sx={{ bgcolor: "#F7F9FC" }}>
                <TableRow>
                  <TableCell sx={{ pl: 4 }}>
                    <strong>PROJECT</strong>
                  </TableCell>

                  {showAssignedTo && (
                    <TableCell>
                      <strong>ASSIGNED TO</strong>
                    </TableCell>
                  )}

                  {showCreatedBy && (
                    <TableCell>
                      <strong>CREATED BY</strong>
                    </TableCell>
                  )}

                  <TableCell>
                    <strong>STATUS</strong>
                  </TableCell>

                  {/* Developer ONLY */}
                  {showDeveloperColumn && (
                    <TableCell align="right" sx={{ pr: 4 }}>
                      <strong>UPDATE STATUS</strong>
                    </TableCell>
                  )}

                  {/* Admin + Tester ONLY: Edit Button */}
                  {(isAdmin || isTester) && (
                    <TableCell align="right" sx={{ pr: 4 }}>
                      <strong>ACTIONS</strong>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered.length > 0 ? (
                  filtered.map((p) => (
                    <TableRow key={p.id} hover>
                      {/* PROJECT NAME */}
                      <TableCell sx={{ pl: 4 }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {p.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {p.description?.slice(0, 50)}...
                        </Typography>
                      </TableCell>

                      {/* ASSIGNED TO */}
                      {showAssignedTo && (
                        <TableCell>
                          {p.assignedToName ? (
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              <Avatar>{getInitials(p.assignedToName)}</Avatar>
                              <Typography>{p.assignedToName}</Typography>
                            </Stack>
                          ) : (
                            <Chip label="Unassigned" size="small" />
                          )}
                        </TableCell>
                      )}

                      {/* CREATED BY */}
                      {showCreatedBy && (
                        <TableCell>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Avatar>{getInitials(p.createdByName)}</Avatar>
                            <Typography>{p.createdByName}</Typography>
                          </Stack>
                        </TableCell>
                      )}

                      {/* STATUS */}
                      <TableCell>
                        <Chip
                          label={p.status}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            color:
                              p.status === "DONE"
                                ? "#10B981"
                                : p.status === "DOING"
                                ? "#3C50E0"
                                : "#64748B",
                            bgcolor:
                              p.status === "DONE"
                                ? "rgba(16,185,129,0.1)"
                                : p.status === "DOING"
                                ? "rgba(60,80,224,0.1)"
                                : "rgba(100,116,139,0.1)",
                          }}
                        />
                      </TableCell>

                      {/* Developer — Update Status Only */}
                      {isDeveloper && (
                        <TableCell align="right" sx={{ pr: 4 }}>
                          {p.status === "DONE" ? (
                            <Chip
                              label="Completed"
                              color="success"
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          ) : (
                            <Tooltip
                              title={
                                p.status === "TODO"
                                  ? "Start Project (Move to Doing)"
                                  : "Mark as Done"
                              }
                            >
                              <IconButton onClick={() => onStatusChange(p)}>
                                {p.status === "TODO" ? (
                                  <PlayArrowIcon />
                                ) : (
                                  <CheckIcon />
                                )}
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      )}

                      {/* Admin / Tester — Only Edit */}
                      {(isAdmin || isTester) && (
                        <TableCell align="right" sx={{ pr: 4 }}>
                          <Tooltip title="Edit Project">
                            <IconButton onClick={() => onEditProject(p)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                      No projects found.
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
