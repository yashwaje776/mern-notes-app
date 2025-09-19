import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import { useContext } from "react";

function AppRoutes() {
  const { token, role } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to={role === "admin" ? "/admin" : "/dashboard"} /> : <Login />}
      />
      <Route
        path="/register"
        element={token ? <Navigate to={role === "admin" ? "/admin" : "/dashboard"} /> : <Register />}
      />
      <Route
        path="/dashboard"
        element={token && role === "user" ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin"
        element={token && role === "admin" ? <AdminPanel /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
