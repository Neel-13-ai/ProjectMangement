import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./context/authContext";
import { Toaster } from "react-hot-toast";

import UserProfile from "./pages/UserProfile";
import Login from "./pages/login";
import DashboardLayout from "./components/dashboard";
import UserList from "./pages/users/UserList";
import AddUser from "./pages/users/AddUser";
import ProjectList from "./pages/project/ProjectList";
import UpdateUser from "./pages/users/UpdateUser";
import AddProject from "./pages/project/AddProject";
import UpdateProject from "./pages/project/UpdateProject";
import BugList from "./pages/Bug/BugList";
import AddBug from "./pages/Bug/AddBug";
import EditBug from "./pages/Bug/UpdateBug";
import AdminDashboard from "./components/dashBoardHome";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (user?.role !== "ADMIN") {
    return <Navigate to="/projects" replace />;
  }

  return children;
};

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* 2. PROTECTED ROUTE LOGIC
           */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route
              path="/users"
              element={
                <AdminRoute>
                  <UserList />
                </AdminRoute>
              }
            />
            <Route
              path="/users/add"
              element={
                <AdminRoute>
                  <AddUser />
                </AdminRoute>
              }
            />
            <Route
              path="/user/edit/:id"
              element={
                <AdminRoute>
                  <UpdateUser />
                </AdminRoute>
              }
            />
            <Route path="/bugs" element={<BugList />} />
            <Route path="/bugs/add" element={<AddBug />} />
            <Route path="/bugs/edit/:id" element={<EditBug />} />

            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/add" element={<AddProject />} />
            <Route path="/projects/edit/:id" element={<UpdateProject />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
