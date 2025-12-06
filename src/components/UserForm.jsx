import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
  CircularProgress,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function UserForm({
  mode = "add",
  initialData = {},
  onSubmitHandler,
  backTo,
  navigate,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isEdit = mode === "edit";
  const title = isEdit ? "Update User" : "Add New User";

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      password: "",
    },
  });

  // ⭐ WATCH FIELD VALUES (required for MUI Select)
  const roleValue = watch("role");

  // ⭐ Load initial data
  useEffect(() => {
    if (!isEdit) return;
    if (!initialData) return;

    reset({
      name: initialData.name || "",
      email: initialData.email || "",
      role: initialData.role?.toUpperCase() || "",
    });
  }, [initialData]);

  const FormLabel = ({ children, required }) => (
    <Typography sx={{ mb: 1, fontWeight: 600, color: "#1A202C" }}>
      {children}
      {required && <span style={{ color: "#d32f2f" }}> *</span>}
    </Typography>
  );

  const handleFormSubmit = async (data) => {
    try {
      await onSubmitHandler(data);
      navigate(backTo);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box sx={{ width: "100%", p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(backTo)}
          sx={{ textTransform: "none" }}
        >
          Back
        </Button>

        <Typography variant="h4" fontWeight={700}>
          {title}
        </Typography>
      </Box>

      {/* Form */}
      <Paper sx={{ p: 4, borderRadius: 2, border: "1px solid #E2E8F0" }}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "repeat(3, 1fr)" },
              gap: 3,
              mb: 4,
            }}
          >
            {/* NAME */}
            <Box>
              <FormLabel required>Name</FormLabel>
              <TextField
                fullWidth
                placeholder="e.g. Alice Johnson"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* EMAIL */}
            <Box>
              <FormLabel required>Email</FormLabel>
              <TextField
                fullWidth
                placeholder="e.g. alice@mail.com"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* PASSWORD — only in ADD mode */}
            {!isEdit && (
              <Box>
                <FormLabel required>Password</FormLabel>
                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}

            {/* ROLE (Fix Applied Here) */}
            <Box>
              <FormLabel required>Role</FormLabel>

              <TextField
                select
                fullWidth
                value={roleValue} // ⭐ Controlled value
                {...register("role", { required: "Role is required" })}
                error={!!errors.role}
                helperText={errors.role?.message}
                SelectProps={{ displayEmpty: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="" disabled>
                  Select user role
                </MenuItem>
                <MenuItem value="DEVELOPER">Developer</MenuItem>
                <MenuItem value="TESTER">Tester</MenuItem>
              </TextField>
            </Box>
          </Box>

          {/* BUTTONS */}
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" onClick={() => navigate(backTo)}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? (
                <CircularProgress size={22} color="inherit" />
              ) : isEdit ? (
                "Update User"
              ) : (
                "Add User"
              )}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
