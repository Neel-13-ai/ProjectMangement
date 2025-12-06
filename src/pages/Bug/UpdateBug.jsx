import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Box, CircularProgress } from "@mui/material";

import BugForm from "../../components/BugForm";
import { getDevelopers } from "../../api/project";
import { getBugById, getTesterProjects, updateBug } from "../../api/bug";

export default function EditBug() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bugData, setBugData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBug = async () => {
    try {
      const bug = await getBugById(id);

      if (!bug) {
        toast.error("Bug not found");
        navigate("/bugs");
        return;
      }

      setBugData(bug);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bug details");
      navigate("/bugs");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await getTesterProjects();
      setProjects(res.projects || []);
    } catch (err) {
      toast.error("Failed to load projects");
    }
  };

  const fetchDevelopers = async () => {
    try {
      const res = await getDevelopers();
      setDevelopers(res.developers || []);
    } catch (err) {
      toast.error("Failed to load developers");
    }
  };

  useEffect(() => {
    Promise.all([fetchBug(), fetchProjects(), fetchDevelopers()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const handleUpdate = async (data) => {
    try {
      const res = await updateBug(id, data);

      toast.success(res.message || "Bug updated successfully!");
      navigate("/bugs");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update bug");
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <BugForm
      mode="edit"
      initialData={bugData}
      projects={projects}
      developers={developers}
      onSubmitHandler={handleUpdate}
      navigate={navigate}
      backTo="/bugs"
    />
  );
}
