import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
const Login = () => {
  
  const { login ,user} = useContext(AuthContext);

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/Dashboard" />;
  }
  const [userInput, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, seterror] = useState({
    email: '',
    password: '',
  });
  const onChnageInputhandler = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
    inputvalidation(name, value);
  };

  const inputvalidation = (name, value) => {
    let errorMsg = '';
    if (name === 'email') {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        errorMsg = 'Invalid email format.';
      }
    }

    if (name === 'password') {
      const passwordPattern = /^[A-Za-z0-9]+$/;
      if (!passwordPattern.test(value) || value.lenght < 6) {
        errorMsg = 'Password must be at least 6 characters, number & letters.';
      }
    }
    seterror((prevState) => ({ ...prevState, [name]: errorMsg }));
  };

  const loginHandler = (e) => {
    console.log('Login userInput info here', userInput);
    e.preventDefault();
    login(userInput.email, userInput.password);
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '25rem' }}>
        <h2 className="text-center mb-4">Sign In</h2>
        <form autoComplete="off">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={onChnageInputhandler}
              required
            />
            {error.email && (
              <span className="text-danger small">{error.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={onChnageInputhandler}
            />
            {error.password && (
              <span className="text-danger small">{error.password}</span>
            )}
          </div>
          <div className="d-grid mb-3">
            <button
              type="button"
              className="btn btn-success"
              disabled={
                !userInput.email || !userInput.password || error.email || error.password
              }
              onClick={loginHandler}
            >
              Sign In
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <Link to="/user-registration" className="text-decoration-none">
              Sign Up
            </Link>
            <Link to="/password-reset" className="text-decoration-none">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
