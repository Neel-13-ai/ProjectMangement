import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProjectForm from "../../components/ProjectForm";
import {
  getDevelopers,
  getProjectById,
  updateProject,
} from "../../api/project";
import { Box, CircularProgress } from "@mui/material";

export default function UpdateProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState(null);
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch project details
  const fetchProject = async () => {
    try {
      const res = await getProjectById(id);

      setProjectData(res.project);
    } catch (err) {
      console.log(err);

      toast.error("Failed to load project details");
      //   navigate("/projects");
    }
  };

  // Fetch developer list
  const fetchDevelopers = async () => {
    try {
      const res = await getDevelopers();
      setDevelopers(res.developers);
    } catch (err) {
      toast.error("Failed to load developers");
    }
  };

  useEffect(() => {
    Promise.all([fetchProject(), fetchDevelopers()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const handleUpdate = async (data) => {
    try {
      const res = await updateProject(id, data);

      toast.success(res.message || "Project updated successfully!");
      navigate("/projects");
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Failed to update project");
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <ProjectForm
      mode="edit"
      initialData={projectData}
      developerList={developers}
      onSubmitHandler={handleUpdate}
      navigate={navigate}
      backTo="/projects"
    />
  );
}
