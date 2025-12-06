import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import BugReportIcon from "@mui/icons-material/BugReport";
import PeopleIcon from "@mui/icons-material/People";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const COLLAPSED_WIDTH = 80;

export default function Sidebar({
  mobileOpen,
  desktopOpen,
  handleDrawerToggle,
  drawerWidth,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const role = user?.role;

  // --- ROLE-BASED SIDEBAR LINKS ---
  const RoleLinks = {
    ADMIN: [
      { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
      { label: "Projects", icon: <FolderIcon />, path: "/projects" },
      { label: "Bugs", icon: <BugReportIcon />, path: "/bugs" },
      { label: "Users", icon: <PeopleIcon />, path: "/users" },
    ],
    TESTER: [
      { label: "Projects", icon: <FolderIcon />, path: "/projects" },
      { label: "Bugs", icon: <BugReportIcon />, path: "/bugs" },
    ],
    DEVELOPER: [
      { label: "Projects", icon: <FolderIcon />, path: "/projects" },
      { label: "Bugs", icon: <BugReportIcon />, path: "/bugs" },
    ],
  };

  const menuItems = RoleLinks[role] || [];

  // ---------------- Drawer Content ------------------------
  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: desktopOpen ? "flex-start" : "center",
          transition: "all 0.3s",
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          AM
        </Box>

        {desktopOpen && (
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ whiteSpace: "nowrap", transition: "0.3s" }}
          >
            AssignMate
          </Typography>
        )}
      </Box>

      {/* Menu Items */}
      <List sx={{ px: desktopOpen ? 2 : 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
              <Tooltip
                title={!desktopOpen ? item.label : ""}
                placement="right"
                arrow
              >
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    minHeight: 48,
                    justifyContent: desktopOpen ? "initial" : "center",
                    px: 2.5,
                    bgcolor: isActive ? "primary.main" : "transparent",
                    color: isActive ? "white" : "text.secondary",
                    "&:hover": {
                      bgcolor: isActive ? "primary.dark" : "action.hover",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "white" : "inherit",
                      minWidth: 0,
                      mr: desktopOpen ? 2 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  {desktopOpen && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? "medium" : "regular",
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      {/* Logout Button */}
      <Box sx={{ mt: "auto", p: 2 }}>
        <Tooltip title={!desktopOpen ? "Logout" : ""} placement="right">
          <ListItemButton
            onClick={logout}
            sx={{
              borderRadius: 2,
              color: "error.main",
              justifyContent: desktopOpen ? "initial" : "center",
            }}
          >
            <ListItemIcon
              sx={{
                color: "error.main",
                minWidth: 0,
                mr: desktopOpen ? 2 : "auto",
              }}
            >
              <PeopleIcon />
            </ListItemIcon>

            {desktopOpen && <ListItemText primary="Logout" />}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );

  // ---------------- Render Desktop + Mobile ------------------------
  return (
    <Box
      component="nav"
      sx={{
        width: { sm: desktopOpen ? drawerWidth : COLLAPSED_WIDTH },
        flexShrink: { sm: 0 },
        transition: "width 0.3s",
      }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: desktopOpen ? drawerWidth : COLLAPSED_WIDTH,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
