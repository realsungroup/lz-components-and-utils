import React from 'react';
import { storiesOf } from '@storybook/react';
import Login from '../Login';
import './index.css';
import '../style/index.less';

storiesOf('登录', module).add('登录', () => <Login />);
