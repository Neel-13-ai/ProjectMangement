import React, { useState } from "react";
import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom"; // <--- IMPORT THIS
import Sidebar from "./sidebar";
import Header from "./header";

const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 80;

export default function DashboardLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDesktopOpen(!desktopOpen);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f1f5f9" }}>
      <CssBaseline />

      {/* Sidebar stays persistent here */}
      <Sidebar
        mobileOpen={mobileOpen}
        desktopOpen={desktopOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={DRAWER_WIDTH}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            xs: "100%",
            sm: `calc(100% - ${
              desktopOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH
            }px)`,
          },
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header handleDrawerToggle={handleDrawerToggle} />

        <Box sx={{ p: 3 }}>
          {/* <--- THIS IS WHERE THE PAGE CONTENT WILL APPEAR */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
