import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/layout/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MaidRegister from "./pages/auth/MaidRegister";

import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerBookings from "./pages/customer/CustomerBookings";
import CustomerProfile from "./pages/customer/CustomerProfile";
import FindHelp from "./pages/customer/FindHelp";

import MaidDashboard from "./pages/maid/MaidDashboard";
import MaidBookings from "./pages/maid/MaidBookings";
import MaidProfile from "./pages/maid/MaidProfile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminMaids from "./pages/admin/AdminMaids";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminSupport from "./pages/admin/AdminSupport";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/maid/register" element={<MaidRegister />} />

      {/* Customer */}
      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute role="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/bookings"
        element={
          <ProtectedRoute role="customer">
            <CustomerBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/find-help"
        element={
          <ProtectedRoute role="customer">
            <FindHelp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/profile"
        element={
          <ProtectedRoute role="customer">
            <CustomerProfile />
          </ProtectedRoute>
        }
      />

      {/* Maid */}
      <Route
        path="/maid/dashboard"
        element={
          <ProtectedRoute role="maid">
            <MaidDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/maid/bookings"
        element={
          <ProtectedRoute role="maid">
            <MaidBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/maid/profile"
        element={
          <ProtectedRoute role="maid">
            <MaidProfile />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/customers"
        element={
          <ProtectedRoute role="admin">
            <AdminCustomers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/maids"
        element={
          <ProtectedRoute role="admin">
            <AdminMaids />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute role="admin">
            <AdminBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reviews"
        element={
          <ProtectedRoute role="admin">
            <AdminReviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/support"
        element={
          <ProtectedRoute role="admin">
            <AdminSupport />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
