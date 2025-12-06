import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserTable from "../../components/UserTable";
import { getUsers } from "../../api/user";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserList = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleAddUser = () => navigate("/users/add");
  const handleEditUser = (user) => navigate(`/user/edit/${user.id}`);
  const handleToggleStatus = (user) => console.log("Toggle:", user);

  return (
    <Box>
      {/* IMPROVEMENT 1: Larger Font Size (h4) & More Bottom Margin */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 4, ml: 3, color: "#1a1a1a" }}
      >
        User Management
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={10}>
          <CircularProgress />
        </Box>
      ) : (
        <UserTable
          users={users}
          onAddUser={handleAddUser}
          onEditUser={handleEditUser}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </Box>
  );
}
