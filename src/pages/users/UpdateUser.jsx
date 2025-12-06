import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserForm from "../../components/UserForm";
import { getUserById, updateUser } from "../../api/user";
import { Box, CircularProgress } from "@mui/material";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await getUserById(id);

      setUserData(response);
    } catch (err) {
      //   console.log(err);

      toast.error("Failed to load user details");
      navigate("/users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async (data) => {
    try {
      const res = await updateUser(id, data);

      if (res?.success || res?.message) {
        toast.success(res.message || "User update successfully!");
        navigate("/users");
      } else {
        toast.error(res.message || "Error Updating User");
      }
      navigate("/users");
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Failed to update user");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={50} thickness={4} />
      </Box>
    );
  }

  return (
    <UserForm
      mode="edit"
      initialData={userData}
      onSubmitHandler={handleUpdate}
      navigate={navigate}
      backTo="/users"
    />
  );
}
