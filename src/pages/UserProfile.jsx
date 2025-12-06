import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  TextField,
  IconButton,
  Container,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import Back Icon
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom"; // Import Navigation Hook

export default function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate(); // Initialize hook

  // Initialize state
  const [formData, setFormData] = useState({
    name: user?.name || "Thomas Anree",
    email: user?.email || "thomas@example.com",
    role: user?.role || "ADMIN",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saving name:", formData.name);
    alert("Profile updated!");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* --- NEW: BACK BUTTON --- */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/dashboard")}
        sx={{ mb: 3, color: "text.secondary", fontWeight: "bold" }}
      >
        Back to Dashboard
      </Button>
      {/* ------------------------ */}

      <Card
        sx={{ borderRadius: 4, boxShadow: "0px 4px 20px rgba(0,0,0,0.08)" }}
      >
        {/* COVER BANNER */}
        <Box
          sx={{
            height: 140,
            background: "linear-gradient(135deg, #3C50E0 0%, #80CAEE 100%)",
          }}
        />

        <CardContent sx={{ p: 4, mt: -8 }}>
          {/* AVATAR & HEADER */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid white",
                  bgcolor: "primary.main",
                  fontSize: "3rem",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                {formData.name.charAt(0).toUpperCase()}
              </Avatar>

              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "white",
                  border: "1px solid #eee",
                  boxShadow: 2,
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
                size="small"
              >
                <PhotoCamera fontSize="small" color="primary" />
              </IconButton>
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mt: 2 }}
            >
              <Typography variant="h5" fontWeight="bold">
                {formData.name}
              </Typography>
              <Chip
                icon={<CheckCircleIcon sx={{ fontSize: "16px !important" }} />}
                label={formData.status}
                color="success"
                size="small"
                variant="outlined"
                sx={{
                  fontWeight: "bold",
                  border: "none",
                  bgcolor: "#E6F7ED",
                  color: "#10B981",
                }}
              />
            </Stack>

            <Typography variant="body1" color="text.secondary">
              {formData.role}
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* FORM FIELDS */}
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Email Address"
              value={formData.email}
              disabled
              helperText="Email cannot be changed"
              InputProps={{ readOnly: true }}
              sx={{ bgcolor: "#f9fafb" }}
            />

            <TextField
              fullWidth
              label="Role"
              value={formData.role}
              disabled
              InputProps={{ readOnly: true }}
              sx={{ bgcolor: "#f9fafb" }}
            />

            <Button
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{
                borderRadius: 2,
                py: 1.5,
                fontWeight: "bold",
                mt: 2,
              }}
            >
              Save Changes
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
