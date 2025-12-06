import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Chip,
  LinearProgress,
  Stack,
  Container,
  Avatar,
} from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BugReportIcon from "@mui/icons-material/BugReport";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

import { getAdminDashboard } from "../api/auth";

// --- UI HELPERS ---

// 1. Get Color for Priority Sliders
const getPriorityColor = (priority) => {
  const p = priority?.toLowerCase() || "";
  if (p.includes("critical")) return "#E11D48"; // Red
  if (p.includes("high")) return "#F59E0B"; // Orange
  if (p.includes("medium")) return "#3B82F6"; // Blue
  return "#10B981"; // Green
};

// 2. Status Chip Component
const StatusChip = ({ label }) => {
  const lowercase = label?.toLowerCase() || "";
  let color = "#64748B";
  let bg = "#F1F5F9";

  switch (lowercase) {
    case "completed":
    case "closed":
    case "done":
      color = "#059669";
      bg = "#ECFDF5";
      break;
    case "in progress":
    case "testing":
    case "developing":
      color = "#2563EB";
      bg = "#EFF6FF";
      break;
    case "todo":
    case "pending":
    case "open":
      color = "#475569";
      bg = "#F1F5F9";
      break;
    case "high":
      color = "#D97706";
      bg = "#FFFBEB";
      break;
    case "critical":
      color = "#BE123C";
      bg = "#FFF1F2";
      break;
    default:
      break;
  }

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        bgcolor: bg,
        color: color,
        fontWeight: 700,
        fontSize: "0.65rem",
        borderRadius: "6px",
        height: "22px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}
    />
  );
};

// ⭐ 3. NEW STAT CARD DESIGN
const StatCard = ({
  title,
  value,
  icon,
  gradientFrom,
  gradientTo,
  iconColor,
}) => (
  <Card
    sx={{
      borderRadius: 4,
      boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.05)",
      border: "none",
      minHeight: "140px", // Comfortable height
      position: "relative",
      overflow: "hidden",
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0px 20px 40px -5px rgba(0, 0, 0, 0.1)",
      },
    }}
  >
    {/* Decorative Colored Stripe on Left */}
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "6px",
        background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
      }}
    />

    <CardContent
      sx={{ p: 3, height: "100%", display: "flex", alignItems: "center" }}
    >
      <Stack direction="row" spacing={3} alignItems="center" width="100%">
        {/* ⭐ GRADIENT ICON BOX */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "18px",
            background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff", // Icon is always white
            boxShadow: `0 8px 20px -5px ${gradientFrom}80`, // Colored Shadow Glow
          }}
        >
          {React.cloneElement(icon, { fontSize: "large" })}
        </Box>

        {/* ⭐ TEXT STYLING */}
        <Box>
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              color: "#1E293B",
              fontSize: "1.8rem",
              lineHeight: 1.2,
              mb: 0.5,
            }}
          >
            {value}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#64748B",
              fontWeight: 700,
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {title}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const DistributionItem = ({ label, count, total, color }) => {
  const percentage = total ? (count / total) * 100 : 0;
  return (
    <Box sx={{ mb: 2.5 }}>
      <Stack direction="row" justifyContent="space-between" mb={1}>
        <Typography fontSize="0.8rem" fontWeight={600} color="text.secondary">
          {label}
        </Typography>
        <Typography fontSize="0.8rem" fontWeight={700}>
          {count}{" "}
          <span style={{ color: "#94A3B8", fontWeight: 400 }}>
            ({Math.round(percentage)}%)
          </span>
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 5,
          bgcolor: "#F1F5F9",
          "& .MuiLinearProgress-bar": { bgcolor: color, borderRadius: 5 },
        }}
      />
    </Box>
  );
};

export default function AdminDashboard() {
  const [dash, setDash] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboard().then((data) => {
      setDash(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );

  if (!dash) return <Typography>Error loading dashboard</Typography>;

  const {
    totalProjects,
    totalBugs,
    totalUsers,
    totalAdmins,
    totalTesters,
    totalDevelopers,
    bugsByStatus,
    bugsByPriority,
    latestProjects,
    latestBugs,
  } = dash;

  // ⭐ STATS CONFIGURATION WITH GRADIENTS
  const stats = [
    {
      title: "Projects",
      value: totalProjects,
      icon: <WorkspacesIcon />,
      gradientFrom: "#4F46E5", // Indigo 600
      gradientTo: "#818CF8", // Indigo 400
    },
    {
      title: "Total Bugs",
      value: totalBugs,
      icon: <BugReportIcon />,
      gradientFrom: "#E11D48", // Rose 600
      gradientTo: "#FB7185", // Rose 400
    },
    {
      title: "Users",
      value: totalUsers,
      icon: <PeopleAltIcon />,
      gradientFrom: "#059669", // Emerald 600
      gradientTo: "#34D399", // Emerald 400
    },
    {
      title: "Admins",
      value: totalAdmins,
      icon: <AdminPanelSettingsIcon />,
      gradientFrom: "#D97706", // Amber 600
      gradientTo: "#FBBF24", // Amber 400
    },
    {
      title: "Developers",
      value: totalDevelopers,
      icon: <EngineeringIcon />,
      gradientFrom: "#7C3AED", // Violet 600
      gradientTo: "#A78BFA", // Violet 400
    },
    {
      title: "Testers",
      value: totalTesters,
      icon: <PersonSearchIcon />,
      gradientFrom: "#0284C7", // Sky 600
      gradientTo: "#38BDF8", // Sky 400
    },
  ];

  return (
    <Container
      maxWidth={false}
      sx={{ py: 4, bgcolor: "#F8FAFC", minHeight: "100vh" }}
    >
      <Typography
        variant="h4"
        fontWeight={800}
        mb={4}
        sx={{ color: "#1E293B" }}
      >
        Dashboard Overview
      </Typography>

      {/* 1. Stat Cards Grid */}
      <Grid container spacing={3} columns={12}>
        {stats.map((s, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <StatCard {...s} />
          </Grid>
        ))}
      </Grid>

      {/* 2. Analytics Row */}
      <Grid container spacing={3} mt={1} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              mt:5,
              p: 3,
              borderRadius: 4,
              boxShadow: "0px 10px 30px -5px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={3} color="#1E293B">
              Bugs by Status
            </Typography>
            {Object.entries(bugsByStatus).map(([k, v]) => (
              <DistributionItem
                key={k}
                label={k}
                count={v}
                total={totalBugs}
                color="#4F46E5"
              />
            ))}
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: "0px 10px 30px -5px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={3} color="#1E293B">
              Bugs by Priority
            </Typography>
            {Object.entries(bugsByPriority).map(([k, v]) => (
              <DistributionItem
                key={k}
                label={k}
                count={v}
                total={totalBugs}
                color={getPriorityColor(k)}
              />
            ))}
          </Card>
        </Grid>
      </Grid>

      {/* 3. Tables */}
      <Grid container spacing={3} mt={1} columns={12}>
        {/* Latest Projects */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0px 10px 30px -5px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            <Box p={3} borderBottom="1px solid #F1F5F9">
              <Typography variant="h6" fontWeight={700} color="#1E293B">
                Latest Projects
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: "#F8FAFC" }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        color: "#64748B",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                      }}
                    >
                      NAME
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#64748B",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                      }}
                    >
                      STATUS
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: "#64748B",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                      }}
                    >
                      DATE
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {latestProjects.map((p) => (
                    <TableRow key={p.id} hover>
                      <TableCell sx={{ fontWeight: 600, color: "#334155" }}>
                        {p.name}
                      </TableCell>
                      <TableCell>
                        <StatusChip label={p.status} />
                      </TableCell>
                      <TableCell align="right" sx={{ color: "#64748B" }}>
                        {new Date(p.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Latest Bugs */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0px 10px 30px -5px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            <Box p={3} borderBottom="1px solid #F1F5F9">
              <Typography variant="h6" fontWeight={700} color="#1E293B">
                Recent Bugs
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: "#F8FAFC" }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        color: "#64748B",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                      }}
                    >
                      TITLE
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#64748B",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                      }}
                    >
                      PRIORITY
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#64748B",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                      }}
                    >
                      STATUS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {latestBugs.map((b) => (
                    <TableRow key={b.id} hover>
                      <TableCell sx={{ fontWeight: 600, color: "#334155" }}>
                        {b.title}
                      </TableCell>
                      <TableCell>
                        <StatusChip label={b.priority} />
                      </TableCell>
                      <TableCell>
                        <StatusChip label={b.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
