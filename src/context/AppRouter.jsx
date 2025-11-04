import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Route yang butuh login */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      {/* Route admin khusus */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <DashboardAdmin />
          </AdminRoute>
        }
      />
    </Routes>
  );
}
