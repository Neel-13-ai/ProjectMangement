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
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckIcon from "@mui/icons-material/Check";
import { useAuth } from "../context/authContext";

export default function BugTable({
  bugs,
  onAddBug,
  onEditBug,
  onStatusUpdate,
}) {
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  const isTester = user?.role === "TESTER";
  const isDeveloper = user?.role === "DEVELOPER";

  const filtered = bugs.filter((b) => {
    const term = search.toLowerCase();
    return (
      b.title.toLowerCase().includes(term) ||
      b.projectName.toLowerCase().includes(term) ||
      b.priority.toLowerCase().includes(term) ||
      b.status.toLowerCase().includes(term)
    );
  });

  return (
    <Box sx={{ m: 3 }}>
      {/* SEARCH + ADD BUTTON */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        mb={3}
      >
        <TextField
          size="small"
          placeholder="Search bugs..."
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

        {isTester && (
          <button
            onClick={onAddBug}
            style={{
              padding: "10px 20px",
              background: "#3C50E0",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            + Add Bug
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
                    <strong>TITLE</strong>
                  </TableCell>
                  <TableCell>
                    <strong>PROJECT</strong>
                  </TableCell>
                  <TableCell>
                    <strong>PRIORITY</strong>
                  </TableCell>

                  {!isDeveloper && (
                    <TableCell>
                      <strong>ASSIGNED TO</strong>
                    </TableCell>
                  )}

                  {!isTester && (
                    <TableCell>
                      <strong>CREATED BY</strong>
                    </TableCell>
                  )}

                  <TableCell>
                    <strong>DUE DATE</strong>
                  </TableCell>

                  <TableCell>
                    <strong>STATUS</strong>
                  </TableCell>

                  {isTester && (
                    <TableCell align="right" sx={{ pr: 4 }}>
                      <strong>ACTIONS</strong>
                    </TableCell>
                  )}

                  {isDeveloper && (
                    <TableCell align="right" sx={{ pr: 4 }}>
                      <strong>UPDATE</strong>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered.length > 0 ? (
                  filtered.map((b) => (
                    <TableRow key={b.id} hover>
                      {/* TITLE */}
                      <TableCell sx={{ pl: 4 }}>
                        <Typography fontWeight={600}>{b.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {b.description?.slice(0, 50)}...
                        </Typography>
                      </TableCell>

                      {/* PROJECT */}
                      <TableCell>{b.projectName}</TableCell>

                      {/* PRIORITY */}
                      <TableCell>
                        <Chip
                          label={b.priority}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            bgcolor:
                              b.priority === "CRITICAL"
                                ? "rgba(239, 68, 68,0.15)"
                                : b.priority === "HIGH"
                                ? "rgba(249,115,22,0.15)"
                                : b.priority === "MEDIUM"
                                ? "rgba(59,130,246,0.15)"
                                : "rgba(107,114,128,0.15)",
                            color:
                              b.priority === "CRITICAL"
                                ? "#EF4444"
                                : b.priority === "HIGH"
                                ? "#F97316"
                                : b.priority === "MEDIUM"
                                ? "#3B82F6"
                                : "#6B7280",
                          }}
                        />
                      </TableCell>

                      {/* ASSIGNED TO */}
                      {!isDeveloper && (
                        <TableCell>{b.assignedToName || "—"}</TableCell>
                      )}

                      {/* CREATED BY */}
                      {!isTester && (
                        <TableCell>{b.createdByName || "—"}</TableCell>
                      )}

                      {/* DUE DATE */}
                      <TableCell>
                        {new Date(b.dueDate).toLocaleDateString()}
                      </TableCell>

                      {/* STATUS */}
                      <TableCell>
                        <Chip
                          label={b.status}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            bgcolor:
                              b.status === "CLOSED"
                                ? "rgba(16,185,129,0.1)"
                                : b.status === "TESTING"
                                ? "rgba(59,130,246,0.1)"
                                : "rgba(107,114,128,0.1)",
                            color:
                              b.status === "CLOSED"
                                ? "#10B981"
                                : b.status === "TESTING"
                                ? "#3B82F6"
                                : "#6B7280",
                          }}
                        />
                      </TableCell>

                      {isTester && (
                        <TableCell align="right" sx={{ pr: 4 }}>
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="flex-end"
                          >
                            {/* ALWAYS SHOW EDIT FOR TESTER */}
                            <Tooltip title="Edit Bug">
                              <IconButton onClick={() => onEditBug(b)}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>

                            {/* STATUS PROGRESSION FOR TESTER */}
                            {b.status === "FIXED" ? (
                              <Tooltip title="Move to Testing">
                                <IconButton
                                  onClick={() => onStatusUpdate(b, "TESTING")}
                                >
                                  <PlayArrowIcon />
                                </IconButton>
                              </Tooltip>
                            ) : b.status === "TESTING" ? (
                              <Tooltip title="Close Bug">
                                <IconButton
                                  onClick={() => onStatusUpdate(b, "CLOSED")}
                                >
                                  <CheckIcon />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="You can't change status yet">
                                <span>
                                  <IconButton disabled sx={{ opacity: 0.4 }}>
                                    <PlayArrowIcon />
                                  </IconButton>
                                </span>
                              </Tooltip>
                            )}
                          </Stack>
                        </TableCell>
                      )}

                      {isDeveloper && (
                        <TableCell align="right" sx={{ pr: 4 }}>
                          {b.status === "ASSIGNED" ? (
                            <Tooltip title="Start Work">
                              <IconButton
                                onClick={() => onStatusUpdate(b, "IN_PROGRESS")}
                              >
                                <PlayArrowIcon />
                              </IconButton>
                            </Tooltip>
                          ) : b.status === "IN_PROGRESS" ? (
                            <Tooltip title="Mark as Fixed">
                              <IconButton
                                onClick={() => onStatusUpdate(b, "FIXED")}
                              >
                                <CheckIcon />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Waiting for tester">
                              <span>
                                <IconButton disabled sx={{ opacity: 0.4 }}>
                                  <CheckIcon />
                                </IconButton>
                              </span>
                            </Tooltip>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} align="center" sx={{ py: 5 }}>
                      No bugs found
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
