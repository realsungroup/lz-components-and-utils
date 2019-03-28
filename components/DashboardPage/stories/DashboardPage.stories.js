import React from 'react';
import { storiesOf } from '@storybook/react';
import DashboardPage from '../DashboardPage';
import './index.css';
import '../style/index.less';

import { rows } from './mockData';

storiesOf('DashboardPage 仪表盘页面', module).add('DashboardPage', () => (
  <div>
    <DashboardPage mode="view" rows={rows} />
    dashboard
  </div>
));
