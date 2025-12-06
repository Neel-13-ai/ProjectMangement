import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getProjects, updateProjectStatus } from "../../api/project";
import ProjectTable from "../../components/ProjectTable";
import toast from "react-hot-toast";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProjectList = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectList();
  }, []);

  const handleAddProject = () => navigate("/projects/add");
  const handleEditProject = (project) =>
    navigate(`/projects/edit/${project.id}`);

  const handleStatusChange = async (project) => {
    try {
      const nextStatus =
        project.status === "TODO"
          ? "DOING"
          : project.status === "DOING"
          ? "DONE"
          : null;

      if (!nextStatus) return;

      const res = await updateProjectStatus(project.id, nextStatus);

      toast.success("Status updated");

      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? res.project : p))
      );
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={600}
        sx={{ mb: 4, ml: 3, color: "#1a1a1a" }}
      >
        Project Management
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={10}>
          <CircularProgress />
        </Box>
      ) : (
        <ProjectTable
          projects={projects}
          onAddProject={handleAddProject}
          onEditProject={handleEditProject}
          onStatusChange={handleStatusChange}
        />
      )}
    </Box>
  );
}
