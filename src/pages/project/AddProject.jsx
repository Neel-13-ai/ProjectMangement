import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import ProjectForm from "../../components/ProjectForm";
import { addProject, getDevelopers } from "../../api/project";

export default function AddProject() {
  const navigate = useNavigate();
  const [developers, setDevelopers] = useState([]);

  const loadDevelopers = async () => {
    try {
      const res = await getDevelopers();

      setDevelopers(res.developers);
    } catch (err) {
      toast.error("Failed to load developers");
    }
  };

  useEffect(() => {
    loadDevelopers();
  }, []);

  const handleAdd = async (data) => {
    await addProject(data);
    toast.success("Project added successfully!");
    navigate("/projects");
  };

  return (
    <ProjectForm
      mode="add"
      developerList={developers}
      onSubmitHandler={handleAdd}
      backTo="/projects"
      navigate={navigate}
    />
  );
}
