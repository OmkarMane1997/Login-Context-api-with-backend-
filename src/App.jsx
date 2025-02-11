import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './Component/Login';
import PasswordReset from './Component/PasswordReset';
import UserRegistration from './Component/UserRegistration';
import { AuthProvider } from './context/AuthContext';
import DashBoardAdmin from './Component/DashBoardAdmin';
import RoleProtectedRoute from './Component/RoleProtectedRoute';
import Products from './Component/Products';
import Users from './Component/User';
import Categories from './Component/Categories';
import Profile from './Component/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/user-registration" element={<UserRegistration />} />
          <Route
            path="/DashBoard"
            element={
              <RoleProtectedRoute allowedRoles={['admin']}>
                <DashBoardAdmin />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/Users"
            element={
              <RoleProtectedRoute allowedRoles={['admin']}>
                <Users />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/Categories"
            element={
              <RoleProtectedRoute allowedRoles={['admin']}>
                <Categories />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/Products"
            element={
              <RoleProtectedRoute allowedRoles={['customer']}>
                <Products />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <RoleProtectedRoute allowedRoles={['admin', 'customer']}>
                <Profile />
              </RoleProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;
