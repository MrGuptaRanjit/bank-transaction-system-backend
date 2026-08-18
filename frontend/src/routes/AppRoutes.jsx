import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Landing Page</div>} />
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