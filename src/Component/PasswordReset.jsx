import { useState } from 'react';
import { Link } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const resetPasswordHandler = () => {
    console.log('Reset Email is here:', email);
  };

  const emailOnChangeHandler = (event) => {
    const value = event.target.value;
    setEmail(value);

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setError(emailPattern.test(value) ? '' : 'Invalid email format.');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '25rem' }}>
        <h2 className="text-center mb-4">Password Reset</h2>
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
              onChange={emailOnChangeHandler}
              value={email}
              required
            />
            {error && <div className="text-danger small">{error}</div>}
          </div>

          <div className="d-grid mb-3">
            <button
              type="button"
              className="btn btn-success"
              disabled={!email || error}
              onClick={resetPasswordHandler}
            >
              Reset Password
            </button>
          </div>

          <div className="text-center">
            <Link to="/" className="text-decoration-none">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
