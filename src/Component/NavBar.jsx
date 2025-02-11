import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const LogoutHandler = (event) => {
    event.preventDefault();
    console.log('Logout');
    logout();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/DashBoard">
            Navbar
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {user.role == 'admin' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/Users">
                    Users
                  </Link>
                </li>
              )}
              {user.role == 'admin' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/Categories">
                    Categories
                  </Link>
                </li>
              )}
              {user.role == 'customer' && (
                <li className="nav-item">
                  <a className="nav-link" href="/contactus">
                    Contact Us
                  </a>
                </li>
              )}
              {user.role == 'customer' && (
                <li className="nav-item">
                  <a className="nav-link" href="/users">
                    Users
                  </a>
                </li>
              )}
              {(user.role === 'admin' || user.role === 'customer') && (
                <li className="nav-item">
                  <Link className="nav-link" to="/Profile">
                    Profile
                  </Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={LogoutHandler}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
