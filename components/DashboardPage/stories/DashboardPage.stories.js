import React from 'react';
import { storiesOf } from '@storybook/react';
import DashboardPage from '../DashboardPage';
import './index.css';
import '../style/index.less';

import { rows } from './mockData';
const baseURL = 'http://kingofdinner.realsun.me:8102/';

storiesOf('DashboardPage 仪表盘页面', module).add('DashboardPage', () => (
  <div>
    <DashboardPage mode="view" rows={rows} baseURL={baseURL} />
    dashboard
  </div>
));
