import { useState, useEffect, useContext } from 'react';
import ReactECharts from 'echarts-for-react';
import Breadcrumb from '../Common/BreadCrumb';
import NavBar from './NavBar';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import Loading from '../Common/Loading';
import Categories from './Categories';
import CONFIG from '../config';
const DashBoardAdmin = () => {
  const { token } = useContext(AuthContext);
  const breadcrumbArray = [{ name: 'DashBoard' }];
  const [chartData, setChartData] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [chartOneLoading, setChartOneLoading] = useState(false); // ECharts Configuration
  const [chartOneLoading2, setChartOneLoading2] = useState(false); // ECharts Configuration
  const [totalUser, setTotalUser] = useState(0);
  const [totalCategory, setTotalCategory] = useState(0);
  const options = {
    title: {
      text: 'User Count',
      subtext: 'System',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData, // Use dynamic data
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  const options2 = {
    title: {
      text: 'Category Count',
      subtext: 'System',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'right',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData2, // Use dynamic data
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  const getAllUser = async () => {
    try {
      setChartOneLoading(true);
      const { data } = await axios.get(CONFIG.GET_ALL_USERS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const adminUser = data.filter((item, index) => item.role === 'admin');
      const customerUser = data.filter(
        (item, index) => item.role === 'customer'
      );
      setChartData([
        { value: adminUser.length, name: 'Admin' },
        { value: customerUser.length, name: 'Customer' },
      ]);
      setTotalUser(data.lenght);
      setChartOneLoading(false);
    } catch (error) {
      console.log(error);
      setChartOneLoading(false);
    }
  };

  const getProductCategory = async () => {
    try {
      setChartOneLoading2(true);
      const { data } = await axios.get(CONFIG.GET_ALL_PRODUCTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      setTotalCategory(data.length);
      const categoryCount = data.reduce((acc, product) => {
        const categoryName = product.category.name;
        acc[categoryName] = (acc[categoryName] || 0) + 1;
        return acc;
      }, {});

      const result = Object.entries(categoryCount).map(([name, value]) => ({
        name,
        value,
      }));
      console.log(result);
      setChartData2(result);
      setChartOneLoading2(false);
    } catch (error) {
      setChartOneLoading2(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUser();
    getProductCategory();
  }, []);
  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <Breadcrumb breadcrumbArray={breadcrumbArray} />
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <ReactECharts
                  option={options}
                  style={{ height: 400 }}
                  showLoading={chartOneLoading} // Built-in loading indicator
                  loadingOption={{
                    text: 'Loading User Count...',
                    color: '#409EFF',
                    textColor: '#000',
                    maskColor: 'rgba(255, 255, 255, 0.5)',
                    zlevel: 0,
                  }}
                />
                <div className="text-center">{totalUser}</div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <ReactECharts
                  option={options2}
                  style={{ height: 400 }}
                  showLoading={chartOneLoading2} // Built-in loading indicator
                  loadingOption={{
                    text: 'Loading Catogory Count...',
                    color: '#409EFF',
                    textColor: '#000',
                    maskColor: 'rgba(255, 255, 255, 0.5)',
                    zlevel: 0,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashBoardAdmin;
