import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from '../pages/auth/Login';
import Unauthorized from '../pages/Unauthorized';

import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';

import AdminDashboard from '../pages/admin/Dashboard';
import Customers from '../pages/admin/Customers';
import Policies from '../pages/admin/Policies';
import AssignPolicy from '../pages/admin/AssignPolicy';

import CustomerDashboard from '../pages/customer/Dashboard';

import { ROLES } from '../constants/roles';

const AppRoutes = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate
              to={
                user?.role === ROLES.ADMIN
                  ? '/admin/dashboard'
                  : '/customer/dashboard'
              }
              replace
            />
          ) : (
            <Login />
          )
        }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="policies" element={<Policies />} />
        <Route path="assign-policy" element={<AssignPolicy />} />
      </Route>

      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
