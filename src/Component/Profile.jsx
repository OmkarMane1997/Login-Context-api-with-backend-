import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Breadcrumb from '../Common/BreadCrumb';
import NavBar from './NavBar';
import Loading from '../Common/Loading';
const Profile = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const breadcrumbArray = [
    { name: 'DashBoard', url: '/DashBoard' },
    { name: 'User Profile' },
  ];
  const [userProfile, setUserProfile] = useState();
  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    setUserProfile(user);
  }, [user]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <Breadcrumb breadcrumbArray={breadcrumbArray} />
        <div className="d-flex vh-50 justify-content-center align-items-center bg-light py-5">
          <div
            className="card shadow-lg"
            style={{ width: '18rem', borderRadius: '12px' }}
          >
            <div className="card-body text-center">
              <img
                src={userProfile?.avatar}
                alt="User Avatar"
                className="rounded-circle border border-secondary mb-3"
                style={{ width: '80px', height: '80px' }}
              />
              <h5 className="card-title">{userProfile?.name}</h5>
              <p className="card-text text-muted">{userProfile?.email}</p>
              <p className="fw-medium text-primary">
                Role: {userProfile?.role}
              </p>
              <button
                type="button"
                className="btn btn-danger mt-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
