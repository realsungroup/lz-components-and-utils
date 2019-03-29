import React from 'react';
import DashboardPage from '../DashboardPage';
import './index.css';
import '../style/index.less';
import http from 'lz-request/lib/http';

import { rows } from './mockData';

/**
 * 获取某个报表分类的所有仪表盘
 * @param {number} UniID 分类 id
 */
http.createApi('getDashboards', {
  url: '/api/Reports/GetUserReports'
});

http.setDefaultBaseURL('http://kingofdinner.realsun.me:8102');

export default class DashboardPageWrap extends React.Component {
  static propTypes = {};

  state = {
    dashboardList: []
  };

  // componentDidMount = () => {
  //   this.getData();
  // };

  // getData = async () => {
  //   let res;
  //   try {
  //     res = await http().getDashboards({ UniID: 605371353285 });
  //   } catch (err) {
  //     return console.error(err);
  //   }
  //   console.log({ resData: res.data });
  //   this.setState({ dashboardList: res.data });
  // };

  render() {
    return (
      <div>
        <DashboardPage rows={rows} mode="view" />
      </div>
    );
  }
}
