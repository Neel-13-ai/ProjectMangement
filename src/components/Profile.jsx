import React, { useState } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/authContext";

const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "A");

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Combine closing the menu and navigating into one function
  const handleProfileClick = () => {
    handleClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/");
  };

  const userName = user?.name || "User";
  const userRole = user?.role || "Admin";

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box sx={{ textAlign: "right", display: { xs: "none", md: "block" } }}>
        <Typography variant="subtitle2" fontWeight={600} lineHeight={1.2}>
          {userName}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {userRole}
        </Typography>
      </Box>

      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 0.5 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            fontWeight: "bold",
            fontSize: "1.2rem",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          {getInitials(userName)}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
            mt: 1.5,
            minWidth: 180,
            "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1, display: { xs: "block", md: "none" } }}>
          <Typography variant="subtitle2">{userName}</Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email}
          </Typography>
          <Divider sx={{ my: 1 }} />
        </Box>

        {/* --- FIXED SECTION --- */}
        {/* onClick is on the MenuItem, not the Icon. And it uses a function ref. */}
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          My Profile
        </MenuItem>
        {/* ------------------- */}

        <Divider />

        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
