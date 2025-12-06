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

import FlagIcon from "@mui/icons-material/Flag";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useForm } from "react-hook-form";

export default function BugForm({
  mode = "add",
  projects = [],
  developers = [],
  initialData = {},
  onSubmitHandler,
  backTo,
  navigate,
}) {
  const isEdit = mode === "edit";
  const pageTitle = isEdit ? "Update Bug" : "Create New Bug";

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: initialData.title || "",
      description: initialData.description || "",
      priority: initialData.priority || "",
      projectId: initialData.projectId || "",
      assignedTo: initialData.assignedTo || "",
      dueDate: initialData.dueDate?.slice(0, 10) || "",
    },
  });

  // ⭐ Controlled Select Values
  const projectValue = watch("projectId");
  const priorityValue = watch("priority");
  const assignedToValue = watch("assignedTo");

  // Reset when project list first loads → FIX MUI warning
  useEffect(() => {
    if (!isEdit && projects.length > 0) {
      reset({
        title: "",
        description: "",
        priority: "",
        projectId: "",
        assignedTo: "",
        dueDate: "",
      });
    }
  }, [projects]);

  // Reset when editing data arrives
  useEffect(() => {
    if (isEdit && initialData) {
      reset({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "",
        projectId: initialData.projectId || "",
        assignedTo: initialData.assignedTo || "",
        dueDate: initialData.dueDate?.slice(0, 10) || "",
      });
    }
  }, [initialData]);

  const FormLabel = ({ children }) => (
    <Typography sx={{ mb: 1, fontWeight: 600, color: "#1A202C" }}>
      {children} <span style={{ color: "#d32f2f" }}>*</span>
    </Typography>
  );

  const onSubmit = async (data) => {
    await onSubmitHandler(data);
  };

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
          {pageTitle}
        </Typography>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 2, border: "1px solid #E2E8F0" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ROW 1 */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              gap: 3,
              mb: 4,
            }}
          >
            {/* BUG TITLE */}
            <Box>
              <FormLabel>Bug Title</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter bug title"
                {...register("title", { required: "Bug title is required" })}
                error={!!errors.title}
                helperText={errors.title?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* PROJECT */}
            <Box>
              <FormLabel>Project</FormLabel>
              <TextField
                select
                fullWidth
                value={projectValue || ""}
                {...register("projectId", { required: "Project is required" })}
                error={!!errors.projectId}
                helperText={errors.projectId?.message}
                SelectProps={{ displayEmpty: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="" disabled>
                  Select Project
                </MenuItem>
                {projects.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          {/* ROW 2 */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              gap: 3,
              mb: 4,
            }}
          >
            {/* PRIORITY */}
            <Box>
              <FormLabel>Priority</FormLabel>
              <TextField
                select
                fullWidth
                value={priorityValue || ""}
                {...register("priority", { required: "Priority is required" })}
                error={!!errors.priority}
                helperText={errors.priority?.message}
                SelectProps={{ displayEmpty: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlagIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="" disabled>
                  Select Priority
                </MenuItem>
                <MenuItem value="LOW">Low</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="HIGH">High</MenuItem>
                <MenuItem value="CRITICAL">Critical</MenuItem>
              </TextField>
            </Box>

            {/* ASSIGN DEVELOPER */}
            <Box>
              <FormLabel>Assign Developer</FormLabel>
              <TextField
                select
                fullWidth
                value={assignedToValue || ""}
                {...register("assignedTo", {
                  required: "Developer is required",
                })}
                error={!!errors.assignedTo}
                helperText={errors.assignedTo?.message}
                SelectProps={{ displayEmpty: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="" disabled>
                  Select Developer
                </MenuItem>
                {developers.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          {/* DUE DATE */}
          <Box sx={{ mb: 4 }}>
            <FormLabel>Due Date</FormLabel>
            <TextField
              fullWidth
              type="date"
              {...register("dueDate", { required: "Due date is required" })}
              error={!!errors.dueDate}
              helperText={errors.dueDate?.message}
            />
          </Box>

          {/* DESCRIPTION */}
          <Box sx={{ mb: 4 }}>
            <FormLabel>Description</FormLabel>
            <TextField
              multiline
              fullWidth
              minRows={3}
              placeholder="Enter bug description"
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
                "Update Bug"
              ) : (
                "Create Bug"
              )}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
