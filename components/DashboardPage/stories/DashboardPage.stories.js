import React from 'react';
import { storiesOf } from '@storybook/react';
import DashboardPage from '../DashboardPage';
import './index.css';

storiesOf('DashboardPage 仪表盘页面', module).add('DashboardPage', () => (
  <div style={{ width: 500 }}>
    <DashboardPage mode="view" rows={[]} />
    dashboard
  </div>
));
