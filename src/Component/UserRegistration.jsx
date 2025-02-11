import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CONFIG from '../config';
import axios from 'axios';

const UserRegistration = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    avatar: 'https://picsum.photos/800',
  });

  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isEmailAvailable, setIsEmailAvailable] = useState(null);

  const validateInput = (name, value) => {
    let errorMsg = '';

    if (name === 'name' && value.length < 3) {
      errorMsg = 'Name must be at least 3 characters.';
    }

    if (name === 'email') {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        errorMsg = 'Invalid email format.';
      }
    }

    if (name === 'password') {
      const passwordPattern = /^[A-Za-z0-9]+$/;
      if (!passwordPattern.test(value)) {
        errorMsg = 'Password must be at least 6 characters, number & letters.';
      }
    }

    setError((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const onChangeInputHandler = async (event) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
    validateInput(name, value);

    if (name === 'email') {
      await checkingEmail(value);
    }
  };

  const checkingEmail = async (email) => {
    try {
      const response = await axios.post(CONFIG.CHECK_THE_EMAIL, {
        email: email,
      });
      setIsEmailAvailable(response.data.isAvailable);
    } catch (err) {
      console.error('Error checking email:', err);
      setIsEmailAvailable(false);
    }
  };

  const newUserRegHandler = async () => {
    if (isEmailAvailable === true) {
      toast.error('Email is already in use.', { position: 'top-right' });
      return;
    }
    try {
      const saveNewUser = await axios.post(CONFIG.CREATE_USER_NEW, {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        avatar: newUser.avatar,
      });
      console.log(saveNewUser);
      toast.success('User Registered Successfully!', {
        position: 'top-right',
        autoClose: CONFIG.TIMEOUT, // 3 seconds
      });
      setNewUser({
        name: '',
        email: '',
        password: '',
        avatar: 'https://picsum.photos/800',
      });
    } catch (err) {
      toast.error(err.message, {
        position: 'top-right',
        autoClose: CONFIG.TIMEOUT, // 3 seconds
      });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg p-4" style={{ width: '25rem' }}>
          <h2 className="text-center mb-4">Sign up</h2>
          <form autoComplete="off">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your Name"
                value={newUser.name}
                onChange={onChangeInputHandler}
                required
              />
              {error.name && (
                <span className="text-danger small">{error.name}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={newUser.email}
                placeholder="Enter your email"
                onChange={onChangeInputHandler}
                required
              />
              {error.email && (
                <span className="text-danger small">{error.email}</span>
              )}
              {isEmailAvailable === true && (
                <span className="text-danger small">
                  Email is already in use.
                </span>
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
                value={newUser.password}
                onChange={onChangeInputHandler}
                required
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
                  !newUser.email ||
                  !newUser.password ||
                  !newUser.name ||
                  error.name ||
                  error.password ||
                  error.email ||
                  isEmailAvailable === true
                }
                onClick={newUserRegHandler}
              >
                Sign up
              </button>
            </div>
            <div className="text-center">
              <Link to="/" className="text-decoration-none">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
