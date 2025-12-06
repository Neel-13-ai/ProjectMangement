import React from "react";
import { AppBar, Toolbar, IconButton, InputBase, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Profile from "./Profile"; // Import the new component

export default function Header({ handleDrawerToggle }) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 64 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 1,
              border: "1px solid #eee",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#f3f4f6",
              borderRadius: 2,
              px: 2,
              py: 0.5,
              width: "100%",
              maxWidth: { xs: 200, md: 400 },
              transition: "max-width 0.3s",
            }}
          >
            <SearchIcon sx={{ color: "text.secondary" }} />
            <InputBase
              placeholder="Type to search..."
              sx={{ ml: 1, flex: 1 }}
            />
          </Box>
        </Box>

        <Profile />
      </Toolbar>
    </AppBar>
  );
}
