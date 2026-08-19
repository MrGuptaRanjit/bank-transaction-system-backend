import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Landing from "../pages/public/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/accounts" element={<div>Accounts</div>} />
        <Route path="/send-money" element={<div>Send Money</div>} />
        <Route path="/transactions" element={<div>Transactions</div>} />
        <Route
          path="/transactions/:id"
          element={<div>Transaction Details</div>}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;