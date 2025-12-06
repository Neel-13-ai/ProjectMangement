import { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
  CircularProgress,
  InputAdornment,
  Stack,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ProjectForm({
  mode = "add",
  initialData = {},
  developerList = [],
  onSubmitHandler,
  backTo,
  navigate,
}) {
  const isEdit = mode === "edit";
  const title = isEdit ? "Update Project" : "Add New Project";

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      assignedTo: "",
    },
  });

  // ⭐ Watch assignedTo to properly control MUI Select
  const assignedToValue = watch("assignedTo");

  useEffect(() => {
    if (isEdit && initialData) {
      reset({
        name: initialData.name || "",
        description: initialData.description || "",
        assignedTo: initialData.assignedTo || "",
      });
    }
  }, [initialData]);

  const handleFormSubmit = async (data) => {
    try {
      await onSubmitHandler(data);
      navigate(backTo);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const FormLabel = ({ children }) => (
    <Typography sx={{ mb: 1, fontWeight: 600, color: "#1A202C" }}>
      {children} <span style={{ color: "#d32f2f" }}>*</span>
    </Typography>
  );

  return (
    <Box sx={{ width: "100%", p: { xs: 2, md: 4 } }}>
      {/* HEADER */}
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

      {/* FORM CARD */}
      <Paper sx={{ p: 4, borderRadius: 2, border: "1px solid #E2E8F0" }}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* GRID TOP SECTION */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              gap: 3,
              mb: 4,
            }}
          >
            {/* PROJECT NAME */}
            <Box>
              <FormLabel>Project Name</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter project name"
                {...register("name", { required: "Project name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* ASSIGNED TO */}
            <Box>
              <FormLabel>Assign To</FormLabel>
              <TextField
                fullWidth
                select
                value={assignedToValue} // ⭐ Controlled value FIX
                {...register("assignedTo", {
                  required: "Assigning a developer is required",
                })}
                error={!!errors.assignedTo}
                helperText={errors.assignedTo?.message}
                SelectProps={{ displayEmpty: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentIndIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="" disabled>
                  Select Developer
                </MenuItem>

                {developerList.map((dev) => (
                  <MenuItem key={dev.id} value={dev.id}>
                    {dev.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          {/* DESCRIPTION FULL WIDTH */}
          <Box sx={{ mb: 4 }}>
            <FormLabel>Description</FormLabel>
            <TextField
              fullWidth
              multiline
              minRows={3}
              placeholder="Enter project description"
              {...register("description", {
                required: "Description is required",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ alignSelf: "flex-start", mt: 1 }}
                  >
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
            />
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
                "Update Project"
              ) : (
                "Add Project"
              )}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
