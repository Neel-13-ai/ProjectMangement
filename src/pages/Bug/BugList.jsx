import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import BugTable from "../../components/BugTable";
import { getBugList, updateBugStatus } from "../../api/bug";

export default function BugList() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBugList = async () => {
    try {
      const data = await getBugList();
      setBugs(data);
    } catch (err) {
      console.error("Error fetching bugs:", err);
      toast.error("Failed to load bugs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugList();
  }, []);

  const handleAddBug = () => navigate("/bugs/add");
  const handleEditBug = (bug) => navigate(`/bugs/edit/${bug.id}`);

  const handleStatusUpdate = async (bug, forcedStatus = null) => {
    try {
      let nextStatus = forcedStatus;

      if (!nextStatus) {
        if (user.role === "DEVELOPER") {
          nextStatus =
            bug.status === "ASSIGNED"
              ? "IN_PROGRESS"
              : bug.status === "IN_PROGRESS"
              ? "FIXED"
              : null;
        } else if (user.role === "TESTER") {
          nextStatus =
            bug.status === "FIXED"
              ? "TESTING"
              : bug.status === "TESTING"
              ? "CLOSED"
              : null;
        }
      }

      if (!nextStatus) {
        toast.error("Invalid status transition");
        return;
      }

      const res = await updateBugStatus(bug.id, nextStatus);

      toast.success(res.message || "Status updated!");

      setBugs((prev) => prev.map((b) => (b.id === bug.id ? res.bug : b)));
    } catch (err) {
      console.error(err);
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
        Bug Management
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={10}>
          <CircularProgress />
        </Box>
      ) : (
        <BugTable
          bugs={bugs}
          onAddBug={handleAddBug}
          onEditBug={handleEditBug}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </Box>
  );
}
