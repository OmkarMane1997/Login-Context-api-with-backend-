import { createContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import CONFIG from '../config';
import Loading from '../Common/Loading';

// ✅ Create the Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ State for user authentication data
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(() =>
    localStorage.getItem('access_token')
  );
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current location for redirection

  // ✅ Ref for refresh token timeout
  const refreshTimeoutRef = useRef(null);

  // ✅ Function to check if the token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    return decoded.exp < Math.floor(Date.now() / 1000);
  };

  // ✅ Login function to authenticate the user
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post(CONFIG.LOGIN_ENDPOINT, {
        email,
        password,
      });

      // ✅ Store tokens in localStorage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      setToken(data.access_token);
      fetchUserProfile(data.access_token);
      startTokenRefresh(); // ✅ Start automatic token refresh process

      // ✅ Redirect to the last visited page or default based on role
      const lastPage =
        location.state?.from ||
        (data.role === 'admin' ? '/DashBoard' : '/Products');
      navigate(lastPage);
    } catch (err) {
      console.log('Login Failed', err?.response?.data);
      if (err?.response?.data?.statusCode === 401) {
        toast.error('User Credentials Incorrect.', { position: 'top-right' });
      }
    } finally {
      setLoading(false); // ✅ Ensure loading is reset
    }
  };

  // ✅ Fetch user profile details
  const fetchUserProfile = async (accessToken) => {
    setLoading(true);
    try {
      const { data } = await axios.get(CONFIG.PROFILE_USER, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setUser(data);
      setRole(data.role);

      // ✅ Redirect only if the user is on login or home page
      if (location.pathname === '/' || location.pathname === '/login') {
        navigate(data.role === 'admin' ? '/DashBoard' : '/Products');
      }
    } catch (error) {
      console.log('Failed to fetch user profile', error?.response?.data);
      logout(); // ✅ Logout on profile fetch failure
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function to clear authentication data
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setToken(null);
    setUser(null);
    setRole(null);

    // ✅ Clear refresh token timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    navigate('/login');
  };

  // ✅ Function to refresh access token before it expires
  const refreshToken = async () => {
    try {
      const { data } = await axios.post(CONFIG.REFRESH_TOKEN_ENDPOINT, {
        refresh_token: localStorage.getItem('refresh_token'),
      });

      localStorage.setItem('access_token', data.access_token);
      setToken(data.access_token);
      startTokenRefresh(); // ✅ Restart refresh process
    } catch (error) {
      console.log('Token refresh failed', error?.response?.data);
      logout();
    }
  };

  // ✅ Function to schedule token refresh
  const startTokenRefresh = () => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    if (!token) return;

    const decoded = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    const delay = decoded.exp - now - 60; // ✅ Refresh token 60 seconds before expiry

    if (delay > 0) {
      refreshTimeoutRef.current = setTimeout(refreshToken, delay * 1000);
    }
  };

  // ✅ Effect to fetch user profile and start token refresh on app load
  useEffect(() => {
    if (token) {
      if (isTokenExpired(token)) {
        refreshToken();
      } else {
        fetchUserProfile(token);
        startTokenRefresh();
      }
    }
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [token]);

  // ✅ Show loading indicator while fetching user data
  if (loading) {
    return <Loading />;
  }

  // ✅ Provide authentication context to child components
  return (
    <AuthContext.Provider
      value={{ user, role, token, login, logout, fetchUserProfile, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
