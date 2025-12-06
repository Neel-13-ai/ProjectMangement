import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addBug, getTesterProjects } from "../../api/bug";
import { getDevelopers } from "../../api/project";
import BugForm from "../../components/BugForm";
import { useNavigate } from "react-router-dom";

export default function AddBug() {
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const proj = await getTesterProjects();
        const devs = await getDevelopers();
        setProjects(proj.projects || []);
        setDevelopers(devs.developers || []);
      } catch (err) {
        toast.error("Failed to load form data");
      }
    };
    load();
  }, []);

  const onSubmitHandler = async (data) => {
    await addBug(data);
    toast.success("Bug created successfully!");
    navigate("/bugs");
  };

  return (
    <BugForm
      mode="add"
      projects={projects}
      developers={developers}
      onSubmitHandler={onSubmitHandler}
      backTo="/bugs"
      navigate={navigate}
    />
  );
}
