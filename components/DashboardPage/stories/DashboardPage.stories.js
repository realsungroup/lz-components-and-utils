import React from 'react';
import { storiesOf } from '@storybook/react';
import DashboardPageWrap from './DashboardPageWrap';

const baseURL = 'http://kingofdinner.realsun.me:5051/';

storiesOf('DashboardPage 仪表盘页面', module).add('DashboardPage', () => (
  <div>
    <DashboardPageWrap />
  </div>
));
