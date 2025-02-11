import axios from 'axios';
import Breadcrumb from '../Common/BreadCrumb';
import Loading from '../Common/Loading';
import CONFIG from '../config';
import AuthContext from '../context/AuthContext';
import NavBar from './NavBar';
import { useState, useEffect, useContext } from 'react';
const Users = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CONFIG.GET_ALL_USERS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const adminUser = data.filter((item, index) => item.role === 'admin');
      console.log(adminUser);
      setData(adminUser);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  if (loading) {
    return <Loading />;
  }
  const breadcrumbArray = [
    { name: 'DashBoard', url: '/DashBoard' },
    { name: 'Users' },
  ];

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <Breadcrumb breadcrumbArray={breadcrumbArray} />
        <h1>users</h1>
        <div className="row">
          {data.map((item, index) => {
            const image = item?.avatar
              ? item?.avatar
              : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5gv6VVdtAGLqBK9MXIBOUGJ-hWeVdiiN-3Q&s`;
            return (
              <div className="col-4 py-3" key={index}>
                <div
                  className="card shadow-lg"
                  style={{ width: '18rem', borderRadius: '12px' }}
                >
                  <div className="card-body text-center">
                    <img
                      src={image}
                      alt="User Avatar"
                      className="rounded-circle border border-secondary mb-3"
                      style={{ width: '80px', height: '80px' }}
                    />
                    <h5 className="card-title">{item?.name}</h5>
                    <p className="card-text text-muted">{item?.email}</p>
                    <p className="fw-medium text-primary">Role: {item?.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Users;
