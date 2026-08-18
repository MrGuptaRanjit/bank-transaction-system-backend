import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Landing from "../pages/public/Landing";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
      </Route>

      <Route path="/login" element={<div>Login Page</div>} />
      <Route path="/register" element={<div>Register Page</div>} />

      <Route path="/dashboard" element={<div>Dashboard</div>} />
      <Route path="/accounts" element={<div>Accounts</div>} />
      <Route path="/send-money" element={<div>Send Money</div>} />
      <Route path="/transactions" element={<div>Transactions</div>} />
      <Route
        path="/transactions/:id"
        element={<div>Transaction Details</div>}
      />
    </Routes>
  );
};

export default AppRoutes;