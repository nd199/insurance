import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Dashboard from '../pages/customer/Dashboard';
import Customers from '../pages/admin/Customers';

// // Pages
// import Login from '../pages/Login';
import AdminDashboard from '../pages/admin/Dashboard';
// import Customers from '../pages/admin/Customers';
// import Policies from '../pages/admin/Policies';
// import AssignPolicy from '../pages/admin/AssignPolicy';
// import CustomerDashboard from '../pages/customer/Dashboard';
// import AdminLayout from '../layouts/AdminLayout';

// // Layout / Guards
// import ProtectedRoute from '../components/ProtectedRoute';

// const AppRoutes = () => {
//   const { isAuthenticated, user } = useSelector(state => state.auth);

//   return (
//     <Routes>
//       {/* ---------- Public Routes ---------- */}
//       <Route path="/" component={Login}></Route>
//       <Route
//         path="/login"
//         element={
//           isAuthenticated ? (
//             <Navigate
//               to={
//                 user?.role === 'ADMIN'
//                   ? '/admin/dashboard'
//                   : '/customer/dashboard'
//               }
//               replace
//             />
//           ) : (
//             <Login />
//           )
//         }
//       />

//       {/* ---------- Admin Routes ---------- */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute allowedRoles={['ADMIN']}>
//             <AdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<AdminDashboard />} />
//         <Route path="customers" element={<Customers />} />
//         <Route path="policies" element={<Policies />} />
//         <Route path="assign-policy" element={<AssignPolicy />} />
//       </Route>

//       {/* ---------- Customer Routes ---------- */}
//       <Route
//         path="/customer/dashboard"
//         element={
//           <ProtectedRoute allowedRoles={['CUSTOMER']}>
//             <CustomerDashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* ---------- Fallback ---------- */}
//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//   );
// };

// export default AppRoutes;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
