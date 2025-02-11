import Breadcrumb from '../Common/BreadCrumb';
import NavBar from './NavBar';

const Categories = () => {
  const breadcrumbArray = [
    { name: 'DashBoard', url: '/DashBoard' },
    { name: 'Categories' },
  ];
  return (
    <>
      <NavBar />

      <div className="container mt-5">
        <Breadcrumb breadcrumbArray={breadcrumbArray} />
        <h1>Categories</h1>
      </div>
    </>
  );
};

export default Categories;
