
import { useNavigate } from "react-router-dom";
import { addUser } from "../../api/user";
import UserForm from "../../components/UserForm";
import toast from "react-hot-toast";

export default function AddUser() {
  const navigate = useNavigate();

  const handleAdd = async (data) => {
    try {
      const res = await addUser(data);

      if (res?.success || res?.message) {
        toast.success(res.message || "User added successfully!");
        navigate("/users");
      } else {
        toast.error(res.message || "Error Adding User");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <UserForm
      mode="add"
 
      backTo="/users"
      navigate={navigate}
      onSubmitHandler={handleAdd}
    />
  );
}
